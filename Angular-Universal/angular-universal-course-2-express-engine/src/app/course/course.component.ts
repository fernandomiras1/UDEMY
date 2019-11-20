import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from 'rxjs';
import {Lesson} from '../model/lesson';
import {Meta, Title} from '@angular/platform-browser';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {


    course: Course;

    dataSource: MatTableDataSource<Lesson>;

    displayedColumns= ['seqNo', 'description', 'duration'];


    constructor(
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private coursesService: CoursesService) {
    }



    ngOnInit() {

    this.course = this.route.snapshot.data['course'];

    this.dataSource = new MatTableDataSource([]);

    this.coursesService.findAllCourseLessons(this.course.id)
        .subscribe(lessons => this.dataSource.data = lessons);

    // seteamos el titulo en google Crhome
    this.title.setTitle(this.course.description);
    // Agregamos los meta tag para el posicionamiento con google
    this.meta.addTag({ name: 'description', content: this.course.description });
    }



}
