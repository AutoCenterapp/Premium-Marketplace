import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent | any;
  testimonials: any =[]
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1, 'autoplay': true, 'dots': true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]};
  constructor(private backendService: BackendService) { }


  ngOnInit(): void {
    this.getTestimonials()
  }

  getTestimonials(){
    this.backendService.getTestimonials().subscribe((response: any)=>{
      if(response.status==200 && response.body && response.body.length>0){
        response.body.forEach((element: any) => {
          this.testimonials.push(element)
        });
        response.body.forEach((element: any) => {
          this.testimonials.push(element)
        });
      }
    });
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

}
