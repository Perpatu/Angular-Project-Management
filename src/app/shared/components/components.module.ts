import {NgModule} from "@angular/core";
import {FileCommentAddComponent} from "./file-comment-add/file-comment-add.component";
import {FilesUploadComponent} from "./files-upload/files-upload.component";
import {ProjectCommentAddComponent} from "./project-comment-add/project-comment-add.component";
import {StlViewerComponent} from "./stl-viewer/stl-viewer.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {SharedModule} from "../shared.module";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    BreadcrumbComponent,
    FileCommentAddComponent,
    FilesUploadComponent,
    ProjectCommentAddComponent,
    StlViewerComponent

  ],
  imports: [
    SharedModule,
    MatCheckboxModule
  ],
  exports: [
    BreadcrumbComponent,
    FileCommentAddComponent,
    FilesUploadComponent,
    ProjectCommentAddComponent,
    StlViewerComponent
  ],
})
export class ComponentsModule {
}
