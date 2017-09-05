export default {
  snapshotDataToArray: (snapshotData) =>{
    let array = []

    snapshotData.forEach((child) => {
      array.push({key: child.key, ...child.val()});
    })

    return array
  }
}
