type FileType = 'project' | 'bio' | 'contact';

type Stack = 'React' | 'Python' | 'Wordpress' | 'Javascript' | 'React Three Fiber';

interface IExperience {
  name: string;
  period: Date[];
  attribution: string;
}

interface IBaseFile {
  name: string;
  type: FileType;
  parent?: IFolder;
}

interface IProject extends IBaseFile {
  type: 'project';
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  year: number;
  image: string;
  externalLink: string;
  mainStack: string;
  stacks: Stack[];
}

interface IBio extends IBaseFile {
  type: 'bio';
  bio: string;
  status: string;
  techStack: string[];
  socialLinks?: string[];
  professionalExperience: IExperience[];
  educationalExperience: IExperience[];
  additionalContent?: string[];
}

interface IconProps {
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}

interface IFolder {
  name: string;
  Files: IFile[];
}

type IFile = IProject | IBio

type Window = IFolder | IFile

interface IOSWindow {
  id: string;
  type: 'folder' | 'file';
  content: Window;
  zIndex: number;
  parentFolder?: IFolder;
}

export type { IProject, IBio, IFile, Window, IFolder, Stack, IconProps, IOSWindow};
