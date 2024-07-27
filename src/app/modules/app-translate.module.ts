import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const HttpLoaderFactory=(http:HttpClient)=> new TranslateHttpLoader(http, './assets/i18n/', '.json');
// const httpLoaderCompilerFactor= ()=>new translateMessageFormateCompiler();


const translateLoder:Provider={
  provide:TranslateLoader,
  useFactory:HttpLoaderFactory,
  deps:[HttpClient]

}

// const translateCompiler:Provider={
//   provide:TranslateCompiler,
//   useFactory:httpLoaderCompilerFactor
// }

@NgModule({})
export class AppTranslateModule {
  static forRoot(): ModuleWithProviders<AppTranslateModule>{
    return TranslateModule.forRoot({
        loader:translateLoder,
        // compiler:translateCompiler
    });

  }
  static forChild(): ModuleWithProviders<AppTranslateModule>{
    return TranslateModule.forRoot({
        loader:translateLoder,
        // compiler:translateCompiler,
        isolate:false
    });

  }
}
