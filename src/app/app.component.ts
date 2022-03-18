import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

interface Cliente{
  id: number,
  servico: number,
  cliente: string,
  contato: string
}

enum Servico{
  'Cabelo',
  'Barba',
  'Combo'
}

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
  fila: Cliente[] = [];
  servicos: typeof Servico = Servico;

  constructor(public fb: FormBuilder, public http: HttpClient){
    this.form = this.fb.group({
      data: [new Date().toLocaleDateString()],
      cliente: [''],
      contato: [''],
      servico: [''],
    });
    this.pegarDados();
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

  pegarDados(){
    console.log("Solicitando dados ao backend");
    this.http.get<Cliente[]>(this.url).subscribe(
      (resposta: Cliente[]) => {
        this.fila = resposta;
      }
    );
  }

  removerDaFila(id:number){
    this.http.patch<any>(this.url, {id}).subscribe(
      (resposta: any) => {
        console.log("Finalizado com sucesso")
      }
    );
  }
}
