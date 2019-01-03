import { Subject } from 'rxjs/Subject';
export const streamStatus$ = new Subject();

export function setupStream(socketConnection, viewarApi) {
  socketConnection
    .getData('startStreaming')
    .subscribe(async ({ sessionId, sceneState }) => {
      //TODO the receiver should be able to accept the call

      sceneState && (await viewarApi.sceneManager.setSceneState(sceneState));
      await viewarApi.cameras.arCamera.activate();
      viewarApi.coreInterface.call('startStreaming', sessionId, 'receiver');
      streamStatus$.next(true);
    });

  socketConnection.getData('stopStreaming').subscribe(async sessionId => {
    viewarApi.coreInterface.call('stopStreaming', sessionId);
    await viewarApi.cameras.perspectiveCamera.activate();
    streamStatus$.next(false);
  });

  socketConnection.getData('syncSceneState').subscribe(async sceneState => {
    await viewar.sceneManager.setSceneState(sceneState);
  });
}
