use std::sync::atomic::{AtomicBool, Ordering};

use tauri::{Manager, WebviewUrl, WebviewWindowBuilder, WindowEvent};

/// True while an update is downloading or installing. Blocks closing every window.
pub struct InstallState(pub AtomicBool);

pub const UPDATER_LABEL: &str = "updater";

/// Called by the frontend when an install starts or finishes (or fails).
#[tauri::command]
fn set_installing(state: tauri::State<InstallState>, active: bool) {
  state.0.store(active, Ordering::SeqCst);
}

/// Opens the separate update window, or focuses it when it is already open.
#[tauri::command]
fn open_updater_window(app: tauri::AppHandle) -> Result<(), String> {
  if let Some(window) = app.get_webview_window(UPDATER_LABEL) {
    window.set_focus().map_err(|e| e.to_string())?;
    return Ok(());
  }

  #[cfg(desktop)]
  {
    WebviewWindowBuilder::new(&app, UPDATER_LABEL, WebviewUrl::App("index.html".into()))
      .title("Jasurdev.uz: yangilaniş")
      .inner_size(460.0, 300.0)
      .resizable(false)
      .center()
      .build()
      .map_err(|e| e.to_string())?;

    Ok(())
  }

  // The update window only exists on desktop; mobile builds never call this.
  #[cfg(not(desktop))]
  {
    let _ = app;
    Err("Update window is desktop-only.".into())
  }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .manage(InstallState(AtomicBool::new(false)))
    .invoke_handler(tauri::generate_handler![set_installing, open_updater_window])
    .on_window_event(|window, event| {
      if let WindowEvent::CloseRequested { api, .. } = event {
        let state = window.state::<InstallState>();
        if state.0.load(Ordering::SeqCst) {
          // Never close the app in the middle of an install.
          api.prevent_close();
        }
      }
    })
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      #[cfg(desktop)]
      {
        app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
        app.handle().plugin(tauri_plugin_process::init())?;
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while building tauri application");
}
