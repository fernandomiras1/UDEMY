import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  // Varable donde va almacenar la conexion a contentful
  // Espera dos valores , el idEspacio y el Token 
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token
  });


  constructor() { }

  // Metodo para obtener todos los cursos
  getCourses(query?: object): Promise<Entry<any>[]> {
    // Creamos una nueva configuracion por eso creamos un objeto
    return this.client.getEntries(Object.assign({
      // le ponemos el nobre course porque es el tipo de contenido q hemos estado creando
      // al principo del curso .
      content_type: 'course'
    }, query))
      .then(res => res.items);
  }

    // Metodo para obtener un curso especifico por ID
    getCourse(courseId): Promise<Entry<any>> {
      return this.client.getEntries(Object.assign({
        content_type: 'course'
      }, {'sys.id': courseId}))
        .then(res => res.items[0]);
    }

    getCourse_hechoFER(courseId): Promise<Entry<any>> {
      return this.client.getEntry(courseId);
    }

}
