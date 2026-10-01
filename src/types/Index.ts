type FileType = 'project' | 'bio';

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

type AppType = 'mailer';

interface IApp {
  name: string;
  type: 'app';
  appType: AppType;
  icon?: React.ReactNode;
  parent?: IFolder;
}

type IFile = IProject | IBio;

type Window = IFolder | IFile | IApp

interface IOSWindow {
  id: string;
  type: 'folder' | 'file' | 'app';
  content: Window;
  zIndex: number;
  parentFolder?: IFolder;
}

export type { IProject, IBio, IFile, Window, IFolder, Stack, IconProps, IOSWindow, IApp, AppType, FileType, IExperience };
