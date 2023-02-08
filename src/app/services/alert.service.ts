import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(mss:string){
    Swal.fire({
          position: 'center',
          icon: 'success',
          title: mss,
          showConfirmButton: false,
          timer: 1000
        })
  }

  error(mss:string){
    Swal.fire({
          position: 'center',
          icon: 'error',
          title: mss,
          showConfirmButton: false,
          timer: 1000
        })
  }

  confirm(mss:string){
   return Swal.fire({
      position: 'top',
      text: mss,
      icon: 'success',
      showCancelButton: true,
      cancelButtonColor: '##d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ตกลง'
    })
  }

  warning(mss:string){
   return Swal.fire({
      position: 'top',
      text: mss,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'ตกลง'
    })
  }

  warnings(mss:string){
   return Swal.fire({
      position: 'top',
      text: mss,
      icon: 'warning',
      // showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'ตกลง'
    })
  }


}
