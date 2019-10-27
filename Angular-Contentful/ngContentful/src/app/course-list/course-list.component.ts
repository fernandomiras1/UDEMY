import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Entry<any> [] = [];

  constructor(private router: Router, 
              private contentfulService: ContentfulService ) { }

  ngOnInit() {
    // Obtenemos todos los cursos
    this.contentfulService.getCourses()
      .then(courses => {
        this.courses = courses
        console.log(this.courses);
      });
  }

  // me va a llevar a la pagina de Detalle del curso-
  goToCourseDetalsPage(courseID) {
    this.router.navigate(['/course', courseID]);
  }

}
