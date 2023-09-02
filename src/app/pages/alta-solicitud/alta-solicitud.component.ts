import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as XLSX from 'xlsx';

import { DependenciasService } from 'src/app/services/dependencias.service';
import { RequisicionesService } from 'src/app/services/requisiciones.service';
import { Requisicion } from 'src/app/models/requisicion.model';
import { environment } from 'src/environments/environment';

declare var $: any
const base_url = environment.base_url;
@Component({
  selector: 'app-alta-solicitud',
  templateUrl: './alta-solicitud.component.html',
  styleUrls: ['./alta-solicitud.component.scss'],
  providers: [MessageService]
})
export class AltaSolicitudComponent implements OnInit {

  @ViewChild('archivoModal')
  archivoModal!: TemplateRef<any>;
  currentURL!: SafeResourceUrl

  private dialogRef!: MatDialogRef<AltaSolicitudComponent>

  constructor(private fb: FormBuilder,
    private dependenciasService: DependenciasService,
    private requisicionesService: RequisicionesService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog)
    {}

  ngOnInit(): void {

    this.dependenciasService.obtenerDependencias().subscribe(data => {
      this.listaDependencias = data.dependencias;
      this.loadRequisiciones();
    });
  }

  public imgURL!: SafeResourceUrl;
  public imgURL1!: SafeResourceUrl;
  public imgURL2!: SafeResourceUrl;
  public imgURL3!: SafeResourceUrl;
  public imgURL4!: SafeResourceUrl;
  public imgURL5!: SafeResourceUrl;
  public imgURL6!: SafeResourceUrl;
  public imgURL7!: SafeResourceUrl;
  public imgURL8!: SafeResourceUrl;

  public verNum = true;
  public cbodependencia = false;
  public requis = false;
  public suficiencia = false;
  public cot1 = false;
  public cot2 = false;
  public cot3 = false;
  public excelCot = false;
  public ordenCompra = false;
  public contratoPDF = false;
  public contratoExcel = false;

  public verNumC = false;
  public cbodependenciaC = false;
  public requisC = false;
  public suficienciaC = false;
  public cot1C = false;
  public cot2C = false;
  public cot3C = false;
  public excelCotC = false;
  public ordenCompraC = false;
  public contratoPDFC = false;
  public contratoExcelC = false;

  public NoControl = ""
  public NombreDependencia = ""
  public requisi = ""
  public suficie = ""
  public cotiza1 = ""
  public cotiza2 = ""
  public cotiza3 = ""
  public excelCotiza = ""
  public compra = ""
  public contratPDF = ""
  public contratExcel = ""

  public respAlerta = false;
  public formSubmitted = false;
  public esCambio = false;
  public ContarSubmit = 0;
  public todoLleno=false;
  public seCargoArhivo=false;

  uid!: string;

  listaDependencias: { dependencia: string, _id: string }[] = [];
  requisiciones: any[] = [];
  public SubirFile!: File
  public SubirFile1!: File
  public SubirFile2!: File
  public SubirFile3!: File
  public SubirFile4!: File
  public SubirFile5!: File
  public SubirFile6!: File
  public SubirFile7!: File
  public SubirFile8!: File

  public registerForm = this.fb.group({
    NoControlPres: ['', Validators.required],
    dependenciaId: ['', Validators.required],
    pdfSolicitudRequicision: [''],
    pdfSuficienciaPresupuestal: [''],
    pdfCotiza1: [''],
    pdfCotiza2: [''],
    pdfCotiza3: [''],
    ExcelComparativo: [''],
    pdfOrdenCompra: [''],
    pdfContrato: [''],
    ExcelContrato: ['']
  });

  loadRequisiciones(): void {
    this.requisicionesService.obtenerRequisiciones().subscribe(data => {
      this.requisiciones = data;
    });
  }

  limpiaVariables() {
    this.NombreDependencia = ""
    this.NoControl = ""
    this.todoLleno=false
    this.ContarSubmit=0
    this.seCargoArhivo=false
  }

  altaOrCambio() {
    
    this.ContarSubmit++
    this.consolaSubmit('vamos entrando al submit')

    if (this.registerForm.pristine){
      this.restablecerForm()
      this.apagaTodo();
      this.limpiaVariables();
      this.consolaSubmit('sale por pristine')
      return
    }
    if (this.todoLleno || (this.esCambio && !this.seCargoArhivo)){
      this.restablecerForm();
      this.apagaTodo();
      this.limpiaVariables();
      this.consolaSubmit('sale por todo Lleno o es cambio y no cargo archivo')
      return
    }
    const { NoControlPres } = this.registerForm.value
    if (!NoControlPres) {
      Swal.fire('Algo falta', 'No se ha capturado el Numero de Control Presupuestal', 'error');
      this.ContarSubmit--
      if(this.ContarSubmit<0){this.ContarSubmit=0}
      this.consolaSubmit('sale por falta del no. de control')
      return;
    }

    if (this.ContarSubmit === 1) {
      this.apagaTodo()
      this.buscaSolicitud(NoControlPres);
      this.consolaSubmit('sale despues de buscar el registro')
      return
    }

    if (this.ContarSubmit > 1 && this.esCambio) {
      this.cambiarRequisicion();
      this.consolaSubmit('sale despues de hacer cambio')
      return
    }

    if (!this.esCambio) {
      this.altaSolicitud();
      this.consolaSubmit('sale despues de hacer alta')
      return
    }

  }
  consolaSubmit(entra:string){
    console.log(entra,' y los datos son:'  )
    console.log('hubo cambios, pristine',!this.registerForm.pristine)
    console.log('cuantos submit',this.ContarSubmit)
    console.log('se cargo archivo',this.seCargoArhivo)
    console.log('es cambio',this.esCambio)
    console.log('todo lleno',this.todoLleno)
  }
  apagaTodo() {
    this.verNum = true;
    this.cbodependencia = false;
    this.requis = false;
    this.suficiencia = false;
    this.cot1 = false;
    this.cot2 = false;
    this.cot3 = false;
    this.excelCot = false;
    this.ordenCompra = false;
    this.contratoPDF = false;
    this.contratoExcel = false;

    this.verNumC=false;
    this.cbodependenciaC=false;
    this.requisC = false;
    this.suficienciaC = false;
    this.cot1C = false;
    this.cot2C = false;
    this.cot3C = false;
    this.excelCotC = false;
    this.ordenCompraC = false;
    this.contratoPDFC = false;
    this.contratoExcelC = false;
  }

  async buscaSolicitud(numeroControl: string) {

    const arrayRequisiciones = Object.values(this.requisiciones);

    if (!arrayRequisiciones || !arrayRequisiciones[0] || !Array.isArray(arrayRequisiciones[0])) {
      console.error('Las requisiciones están vacías o no tienen la estructura esperada.');
      return;
    }

    const solicitudEncontrada = arrayRequisiciones[0].find((requisicion: any) => requisicion.NoControlPres === numeroControl);

    if (solicitudEncontrada) {

      this.formSubmitted = true;

      this.uid = solicitudEncontrada.uid;
      this.NombreDependencia = solicitudEncontrada.dependencia.dependencia
      this.NoControl = solicitudEncontrada.NoControlPres
      this.requisi = solicitudEncontrada.pdfSolicitudRequicision
      this.suficie = solicitudEncontrada.pdfSuficienciaPresupuestal
      this.cotiza1 = solicitudEncontrada.pdfCotiza1
      this.cotiza2 = solicitudEncontrada.pdfCotiza2
      this.cotiza3 = solicitudEncontrada.pdfCotiza3
      this.excelCotiza = solicitudEncontrada.ExcelComparativo
      this.compra = solicitudEncontrada.pdfOrdenCompra
      this.contratPDF = solicitudEncontrada.pdfContrato
      this.contratExcel = solicitudEncontrada.ExcelContrato

      // Mapeo de _id a dependenciaId
      if (solicitudEncontrada.dependencia && solicitudEncontrada.dependencia._id) {
        solicitudEncontrada.dependenciaId = solicitudEncontrada.dependencia._id;
      }

      this.registerForm.patchValue(solicitudEncontrada);
      this.esCambio = true;
      console.log('los datos del registro encontrado son:', solicitudEncontrada)
      console.log('los datos del registro en la forma son', this.registerForm.value)

      this.prenderApagar();
      this.verNum = false;
      this.cbodependencia = false;
      this.verNumC = true;
      this.cbodependenciaC = true;


    } else {  // solicitud no encontrada, preguntar si hacer alta
      await this.abrirAlerta('Alta', '¿Deseas agregar este número de control presupuestal?',true)
      if (this.respAlerta) {
        this.esCambio = false;
        this.formSubmitted = true;
        this.verNum = true
        this.cbodependencia = true
        this.requis = true;
        this.suficiencia = true;
        this.verNumC = false;
        this.cbodependenciaC = false;
        }
      else {
        this.restablecerForm();
      }
    }
  }

  mostrarArchivo(url:SafeResourceUrl) {
    this.currentURL = url;
    if (this.archivoModal) {
        this.dialogRef = this.dialog.open(this.archivoModal);
    }
  }
  cerrar() {
    this.dialogRef.close();
  }

  prenderApagar() {
    this.apagaTodo();
    this.todoLleno=false
    if(!this.esCambio){
      return
    }
    if (this.requisi === undefined) { this.requis = true } 
    else { 
      this.requisC = true 
      this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/requisiciones/${ this.requisi }`);
    }
    if (this.suficie === undefined) { this.suficiencia = true }
    else { 
      this.suficienciaC = true
      this.imgURL1= this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/suficiencias/${ this.suficie }`)
    }

    if (this.requisi !== undefined && this.suficie !== undefined){
      if(this.cotiza1 === undefined){ this.cot1=true}
        else {
          this.cot1C=true;
          this.imgURL2= this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/cotizaciones1/${ this.cotiza1 }`)
          if(this.cotiza2 === undefined){this.cot2=true}
            else {
              this.cot2C=true
              this.imgURL3= this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/cotizaciones2/${ this.cotiza2 }`)
              if(this.cotiza3 === undefined){this.cot3=true}
                else {
                  this.cot3C=true
                  this.imgURL4= this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/cotizaciones3/${ this.cotiza3 }`)
                  if(this.excelCotiza === undefined){this.excelCot=true}
                    else {
                      this.excelCotC=true
                      this.imgURL5=this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/excelComparativos/${ this.excelCotiza }`)
                      if(this.compra === undefined){this.ordenCompra=true}
                        else {
                          this.imgURL6=this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/ordenesCompra/${ this.compra }`)
                          this.ordenCompraC=true
                          if(this.contratPDF === undefined){this.contratoPDF=true}
                            else {
                              this.imgURL7=this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/pdfContratos/${ this.contratPDF }`)
                              this.contratoPDFC=true
                              if(this.contratExcel === undefined){this.contratoExcel=true}
                                else {
                                  this.imgURL8=this.sanitizer.bypassSecurityTrustResourceUrl(`${ base_url }/descargas/excelContratos/${ this.contratExcel }`)
                                  this.contratoExcelC=true
                                  this.todoLleno=true
                                }
                            }
                        }
                    }
                }
            }
        }
      }
  }

  altaSolicitud() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {

      const { NoControlPres, dependenciaId } = this.registerForm.value;

      if (!NoControlPres || !dependenciaId) {
        console.error('Los valores no están definidos');
        return;
      }

      this.requisicionesService.crearRequisicion(NoControlPres, dependenciaId).subscribe({
        next: (response: any) => {
          this.uid = response.Requisicion.uid;
          Swal.fire('Guardado', 'La requisición se dió de alta', 'success');
          
          this.grabarArchivos(this.uid);
          this.limpiaVariables();
          this.restablecerForm();
          this.apagaTodo();
        }
      });

    } else {
      console.error('Formulario no válido');
      // Puedes mostrar un mensaje al usuario indicando que debe completar el formulario correctamente.
    }
  }

  cambiarRequisicion() {
    // Verificamos si el formulario es válido
    if (this.registerForm.valid) {

      const { NoControlPres, dependenciaId } = this.registerForm.value;

      if (!NoControlPres || !dependenciaId || !this.uid) {
        console.error('Los valores no están definidos');
        return;
      }

      // Llamada al servicio para actualizar
      this.requisicionesService.actualizarRequisicion(NoControlPres, dependenciaId, this.uid).subscribe(response => {
        console.log('Requisición actualizada exitosamente', response);
        console.log('id del registro encontrado', this.uid)
        this.grabarArchivos(this.uid);

        Swal.fire('Guardado', 'La requisición se actualizó correctamente', 'success');
        this.restablecerForm();
        this.apagaTodo();

      }, error => {
        console.error('Hubo un error al actualizar la requisición:', error);
      });
    } else {
      console.error('El formulario no es válido');
    }
  }

  restablecerForm() {
    this.registerForm.reset();
    this.formSubmitted = false;
    this.esCambio = false;
    this.ContarSubmit = 0;
    this.seCargoArhivo=false
    this.loadRequisiciones();
  }

  grabarArchivos(idReq: string) {
    if (this.SubirFile !== undefined) {
      this.subirArchivo(idReq, 'requisiciones', this.SubirFile);
    }

    if (this.SubirFile1 !== undefined) {
      this.subirArchivo(idReq, 'suficiencias', this.SubirFile1);
    }

    if (this.SubirFile2 !== undefined) {
      this.subirArchivo(idReq, 'cotizaciones1', this.SubirFile2);
    }

    if (this.SubirFile3 !== undefined) {
      this.subirArchivo(idReq, 'cotizaciones2', this.SubirFile3);
    }

    if (this.SubirFile4 !== undefined) {
      this.subirArchivo(idReq, 'cotizaciones3', this.SubirFile4);
    }

    if (this.SubirFile5 !== undefined) {
      this.subirArchivo(idReq, 'excelComparativos', this.SubirFile5);
    }

    if (this.SubirFile6 !== undefined) {
      this.subirArchivo(idReq, 'ordenesCompra', this.SubirFile6);
    }

    if (this.SubirFile7 !== undefined) {
      this.subirArchivo(idReq, 'pdfContratos', this.SubirFile7);
    }

    if (this.SubirFile8 !== undefined) {
      this.subirArchivo(idReq, 'excelContratos', this.SubirFile8);
    }
    this.loadRequisiciones();
  }

  cambiarFile(file: any) {

    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile = file.target.files[0];
      console.log(file.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = function () {
        $('#addAvancesBtn').prop("disabled", true)
      }
      reader.onloadend = function () {
        alert("Archivo cargado! ya puede enviar")
        $('#addAvancesBtn').prop("disabled", false)
      }
      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }

  cambiarFile1(file: any) {

    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile1 = file.target.files[0];
      console.log(file.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = function () {
        $('#addAvancesBtn').prop("disabled", true)
      }
      reader.onloadend = function () {
        alert("Archivo cargado! ya puede enviar")
        $('#addAvancesBtn').prop("disabled", false)
      }
      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }

  cambiarFile2(file: any) {

    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile2 = file.target.files[0];
      console.log(file.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = function () {
        $('#addAvancesBtn').prop("disabled", true)
      }
      reader.onloadend = function () {
        alert("Archivo cargado! ya puede enviar")
        $('#addAvancesBtn').prop("disabled", false)
      }
      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }

  cambiarFile3(file: any) {

    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile3 = file.target.files[0];
      console.log(file.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = function () {
        $('#addAvancesBtn').prop("disabled", true)
      }
      reader.onloadend = function () {
        alert("Archivo cargado! ya puede enviar")
        $('#addAvancesBtn').prop("disabled", false)
      }
      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }

  cambiarFile4(file: any) {

    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile4 = file.target.files[0];
      console.log(file.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = function () {
        $('#addAvancesBtn').prop("disabled", true)
      }
      reader.onloadend = function () {
        alert("Archivo cargado! ya puede enviar")
        $('#addAvancesBtn').prop("disabled", false)
      }
      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }

  cambiarFile5(file: any) {
    const input = file.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
  
    const arch = input.files[0];
    const fileName = arch.name;
  
    if (!(fileName.endsWith('.xlsx') || fileName.endsWith('.xls'))) {
      this.abrirAlerta('Solo Excel', 'El archivo NO es una hoja de cálculo',false)    
      input.value = '';// Vaciando el input de archivo
      this.seCargoArhivo=false
      return
    }
    
    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile5 = file.target.files[0];
      console.log(file.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = function () {
        $('#addAvancesBtn').prop("disabled", true)
      }
      reader.onloadend = function () {
        alert("Archivo cargado! ya puede enviar")
        $('#addAvancesBtn').prop("disabled", false)
      }
      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }

  cambiarFile6(file: any) {

    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile6 = file.target.files[0];
      console.log(file.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = function () {
        $('#addAvancesBtn').prop("disabled", true)
      }
      reader.onloadend = function () {
        alert("Archivo cargado! ya puede enviar")
        $('#addAvancesBtn').prop("disabled", false)
      }
      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }

  cambiarFile7(file: any) {

    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile7 = file.target.files[0];
      console.log(file.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = function () {
        $('#addAvancesBtn').prop("disabled", true)
      }
      reader.onloadend = function () {
        alert("Archivo cargado! ya puede enviar")
        $('#addAvancesBtn').prop("disabled", false)
      }
      reader.onerror = function () {
        console.log(reader.error);
      }
    }
  }

  cambiarFile8(file: any) {
    const input = file.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
  
    const arch = input.files[0];
    const fileName = arch.name;
  
    if (!(fileName.endsWith('.xlsx') || fileName.endsWith('.xls'))) {
      this.abrirAlerta('Solo Excel', 'El archivo NO es una hoja de cálculo',false)    
      input.value = '';// Vaciando el input de archivo
      this.seCargoArhivo=false
      return
    }
    
    const target: DataTransfer = <DataTransfer>(file.target);
    if (file !== null) {
      this.seCargoArhivo=true
      this.SubirFile8 = file.target.files[0];
      if (target.files.length !== 1) throw new Error('No se puede usar múltiples archivos');

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const data: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, {type: 'binary'});
    
        const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
    
        const cellA1 = worksheet['A1'] ? worksheet['A1'].v : 'N/A';
        const cellB1 = worksheet['B1'] ? worksheet['B1'].v : 'N/A';
    
        console.log(`A1 cell: ${cellA1}`);
        console.log(`B1 cell: ${cellB1}`);
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

  subirArchivo(idRequisicion: string, tipoDocumento: any, nombreArch: any) {

    this.requisicionesService.grabarpdfSolicitudRequicision(idRequisicion, nombreArch, tipoDocumento)
      .then(arch => console.log(arch))

  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  async abrirAlerta(tituloAlert: string, preguntaAlert: string,botonCancel:boolean) {
    const result = await Swal.fire<string>({
      title: tituloAlert,
      text: preguntaAlert,
      //input: 'text',
      //inputPlaceholder: holderAlert,
      showCancelButton: botonCancel
    });

    if (result.isDismissed) {
      // El usuario presionó "Cancelar" o cerró el popup
      this.respAlerta = false

    } else if (result.isConfirmed) {
      // El usuario presionó "Aceptar"
      this.respAlerta = true
    }
  }


}
