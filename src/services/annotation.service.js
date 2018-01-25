const partial = (fn, ...args) => fn.bind(null, ...args);

export default function AnnotationService() {

  return {
    init,
    getData,
    setData,
    data: {},
    selectedId: null,
    getSelectedData,
    insertSelectedDataIntoScene,
    addAnnotationToSelectedId,
    addAnnotation,
    instanceMapping: {},
  };

  function init({viewarApi}) {
    this.viewarApi = viewarApi;

    this.data = {
      1: {
        id: 1,
        name: 'Machine 1',
        annotations: [
          {
            name: 'Module 1.1',
            status: 'OK',
            description: 'test test 1.1',
            pose: { position: { x: 0, y: 0, z: 0}}
          },
          {
            name: 'Module 1.2',
            status: 'OK',
            description: 'test test 1.2',
            pose: { position: { x: 0, y: 1000, z: 0}}
          },
          {
            name: 'Module 1.3',
            status: 'OK',
            description: 'test test 1.3',
            pose: { position: { x: 0, y: 2000, z: 0}}
          }
        ]
      },
      2: {
        id: 2,
        name: 'Machine 2',
        annotations: [
          {
            name: 'Modul 2.1',
            status: 'OK',
            description: 'Hier steht die Beschreibung für Modul 2.1',
            pose: { position: { x: 0, y: 0, z: 0}, scale: { x: 0.3, y: 0.3, z: 0.3}}
          },
          {
            name: 'Modul 2.2',
            status: 'OK',
            description: 'Hier steht die Beschreibung für Modul 2.2',
            pose: { position: { x: 100, y: 0, z: 0}, scale: { x: 0.3, y: 0.3, z: 0.3}}
          },
          {
            name: 'Modul 2.3',
            status: 'OK',
            description: 'Hier steht die Beschreibung für Modul 2.3',
            pose: { position: { x: -100, y: 0, z: 0}, scale: { x: 0.3, y: 0.3, z: 0.3}}
          }
        ]
      }
    }
  }

  function getData(id) {
    return this.data[id];
  }

  function setData(id, payload) {
    this.data[id] = payload;
  }

  async function addAnnotationToSelectedId(instanceId, annotation) {
    this.data[this.selectedId].annotations.push(annotation);
    this.instanceMapping[instanceId] = annotation;
  }

  function addAnnotation(id, annotation) {
    this.data[id].annotations.push(annotation);
  }

  function getSelectedData() {
    return this.getData(this.selectedId);
  }

  async function insertSelectedDataIntoScene({ onProgressUpdate }) {
    const { sceneManager: { insertModel, insertContainer }, modelManager: { findModelByForeignKey } } = this.viewarApi;
    const { annotations } = this.getSelectedData();

    const model = findModelByForeignKey('ball');

    const tasks = annotations.map(annotation =>
      partial(insertModel, model, {
        pose: annotation.pose,
      })
    );

    const taskLength = tasks.length;

    for (let i = 0; i < taskLength; i++){
      const { id } = await tasks[i]();
      this.instanceMapping[id] = annotations[i];
      onProgressUpdate(parseInt((i+1)/taskLength * 100));
    }
  }


}