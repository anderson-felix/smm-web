type FuncType = (params: React.DragEvent<HTMLDivElement>) => File[];

export const getFilesFromDragEvent: FuncType = e => {
  const files: File[] = [];

  if (e.dataTransfer.items) {
    const { items } = e.dataTransfer;

    for (let i = 0; i < items.length; i += 1) {
      const file = items[i].kind === 'file' && items[i]?.getAsFile();
      if (file) files.push(file);
    }

    return files;
  }

  const fileList = e.dataTransfer.files;
  for (let i = 0; i < fileList.length; i += 1) files.push(fileList[i]);

  return files;
};
