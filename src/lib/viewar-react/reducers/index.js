import { combineReducers } from 'redux';
import GeneralReducer from './generalReducer';
import SceneReducer from './sceneReducer';
import SelectionReducer from './selectionReducer';
import CameraReducer from './cameraReducer';


export default function viewarReducers() {

  return combineReducers({
    viewar_scene: SceneReducer,
    viewar_general: GeneralReducer,
    viewar_selection: SelectionReducer,
    viewar_camera: CameraReducer,
  });
}
