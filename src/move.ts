interface File {
  id: string;
  name: string;
}

interface Folder {
  id: string;
  name: string;
  files: File[];
}

type List = Folder[];

export default function move(
  list: List,
  source: string,
  destination: string,
): List {
  const clonedList: List = JSON.parse(JSON.stringify(list)) as List;
  let sourceObj: File | undefined;
  let destinationObj: Folder | undefined;

  clonedList.forEach((folder: Folder) => {
    if (folder.id === source) throw new Error('You cannot move a folder');

    for (let i = 0; i < folder.files.length; i += 1) {
      if (folder.files[i].id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }

      if (folder.files[i].id === source) {
        sourceObj = folder.files[i];
        folder.files.splice(i, 1);
        break;
      }
    }

    if (folder.id === destination) destinationObj = folder;
  });

  if (!sourceObj) throw new Error('Source not found');
  if (!destinationObj) throw new Error('Destination not found');

  destinationObj.files.push(sourceObj);
  return clonedList;
}
