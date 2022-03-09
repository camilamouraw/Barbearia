import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barbearia';
  logado: boolean = true;
  form: FormGroup;
  url: string = 'http://lucasreno.kinghost.net/barbearia';

  constructor(public fb: FormBuilder, public http: HttpClient){
    this.form = this.fb.group({
      data: [new Date().toLocaleDateString()],
      cliente: [''],
      contato: [''],
      servico: [''],
    });
  }

  verificarSenha(event: any){
    this.logado = event.target.value == '123';
  }

  enviarDados(){
    console.log(this.form.value);
    this.http.post<any>(this.url, this.form.value).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error.error);
      }
    );
  }
}
