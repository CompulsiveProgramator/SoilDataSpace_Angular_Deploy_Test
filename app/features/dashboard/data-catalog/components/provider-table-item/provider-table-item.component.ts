import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProviderTableInterface } from '../../interfaces/provider-table-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-provider-table-item',
  standalone: false,
  templateUrl: './provider-table-item.component.html',
  styleUrl: './provider-table-item.component.css'
})
export class ProviderTableItemComponent implements OnInit {
  //ATRIBUTOS
  @Input() providerTableItem!: ProviderTableInterface;

  //--- Datos de prueba ---
  testData = [
  {
    "IdProvincia": 4,
    "IdEstacion": 10,
    "Fecha": "28/10/2025",
    "Año": 2025,
    "Dia": 301,
    "Temp Media (ºC)": "20,01",
    "Temp Max (ºC)": "24,99",
    "Hora Temp Max": "13:32",
    "Temp Mínima (ºC)": "16,87",
    "Hora Temp Min": "04:02",
    "Humedad Media (%)": "81,1",
    "Humedad Max (%)": "94,1",
    "Hora Hum Max": "19:12",
    "Humedad Min (%)": "63,45",
    "Hora Hum Mín": "10:34",
    "Velviento (m/s)": "1,25",
    "DirViento (º)": "58,34",
    "VelVientoMax (m/s)": "4,78",
    "Hora VelMax": "18:10",
    "Dir viento Vel Max (º)": "276,5",
    "Radiación (MJ/m2)": "11,91",
    "Precipitación (mm)": "1,2",
    "PePMon": 0,
    "EtPMon": "2,08"
  },
  {
    "IdProvincia": 4,
    "IdEstacion": 10,
    "Fecha": "29/10/2025",
    "Año": 2025,
    "Dia": 302,
    "Temp Media (ºC)": "19,86",
    "Temp Max (ºC)": "24,32",
    "Hora Temp Max": "11:46",
    "Temp Mínima (ºC)": 17,
    "Hora Temp Min": "05:24",
    "Humedad Media (%)": 84,
    "Humedad Max (%)": "93,7",
    "Hora Hum Max": "05:38",
    "Humedad Min (%)": "50,96",
    "Hora Hum Mín": "12:52",
    "Velviento (m/s)": "0,92",
    "DirViento (º)": "275,9",
    "VelVientoMax (m/s)": "5,36",
    "Hora VelMax": "20:15",
    "Dir viento Vel Max (º)": "303,6",
    "Radiación (MJ/m2)": "9,25",
    "Precipitación (mm)": "11,4",
    "PePMon": "6,61",
    "EtPMon": "1,83"
  },
  {
    "IdProvincia": 4,
    "IdEstacion": 10,
    "Fecha": "30/10/2025",
    "Año": 2025,
    "Dia": 303,
    "Temp Media (ºC)": "20,06",
    "Temp Max (ºC)": "23,99",
    "Hora Temp Max": "10:04",
    "Temp Mínima (ºC)": "17,2",
    "Hora Temp Min": "06:02",
    "Humedad Media (%)": "82,3",
    "Humedad Max (%)": "95,5",
    "Hora Hum Max": "01:34",
    "Humedad Min (%)": "58,95",
    "Hora Hum Mín": "10:10",
    "Velviento (m/s)": "1,74",
    "DirViento (º)": "292,2",
    "VelVientoMax (m/s)": "7,08",
    "Hora VelMax": "15:22",
    "Dir viento Vel Max (º)": "268,3",
    "Radiación (MJ/m2)": "14,76",
    "Precipitación (mm)": "1,6",
    "PePMon": 0,
    "EtPMon": "2,42"
  },
  {
    "IdProvincia": 4,
    "IdEstacion": 10,
    "Fecha": "31/10/2025",
    "Año": 2025,
    "Dia": 304,
    "Temp Media (ºC)": "19,28",
    "Temp Max (ºC)": "23,65",
    "Hora Temp Max": "10:02",
    "Temp Mínima (ºC)": "14,07",
    "Hora Temp Min": "22:54",
    "Humedad Media (%)": "73,6",
    "Humedad Max (%)": "91,6",
    "Hora Hum Max": "23:38",
    "Humedad Min (%)": "53,54",
    "Hora Hum Mín": "09:00",
    "Velviento (m/s)": "1,47",
    "DirViento (º)": "296,9",
    "VelVientoMax (m/s)": "5,64",
    "Hora VelMax": "15:19",
    "Dir viento Vel Max (º)": "262,1",
    "Radiación (MJ/m2)": "13,77",
    "Precipitación (mm)": 0,
    "PePMon": 0,
    "EtPMon": "2,27"
  },
  {
    "IdProvincia": 4,
    "IdEstacion": 10,
    "Fecha": "01/11/2025",
    "Año": 2025,
    "Dia": 305,
    "Temp Media (ºC)": "18,7",
    "Temp Max (ºC)": "22,59",
    "Hora Temp Max": "13:58",
    "Temp Mínima (ºC)": "14,87",
    "Hora Temp Min": "00:26",
    "Humedad Media (%)": "71,8",
    "Humedad Max (%)": "87,8",
    "Hora Hum Max": "00:00",
    "Humedad Min (%)": "43,41",
    "Hora Hum Mín": "08:06",
    "Velviento (m/s)": "1,46",
    "DirViento (º)": "291,8",
    "VelVientoMax (m/s)": "5,96",
    "Hora VelMax": "17:16",
    "Dir viento Vel Max (º)": "258,9",
    "Radiación (MJ/m2)": "13,89",
    "Precipitación (mm)": 0,
    "PePMon": 0,
    "EtPMon": "2,35"
  },
  {
    "IdProvincia": 4,
    "IdEstacion": 10,
    "Fecha": "02/11/2025",
    "Año": 2025,
    "Dia": 306,
    "Temp Media (ºC)": "18,86",
    "Temp Max (ºC)": "23,85",
    "Hora Temp Max": "10:24",
    "Temp Mínima (ºC)": "15,54",
    "Hora Temp Min": "23:50",
    "Humedad Media (%)": "73,8",
    "Humedad Max (%)": "93,3",
    "Hora Hum Max": "23:34",
    "Humedad Min (%)": "55,26",
    "Hora Hum Mín": "08:44",
    "Velviento (m/s)": "0,61",
    "DirViento (º)": "36,07",
    "VelVientoMax (m/s)": "3,79",
    "Hora VelMax": "06:20",
    "Dir viento Vel Max (º)": "350,6",
    "Radiación (MJ/m2)": "14,58",
    "Precipitación (mm)": 0,
    "PePMon": 0,
    "EtPMon": "1,91"
  },
  {
    "IdProvincia": 4,
    "IdEstacion": 10,
    "Fecha": "03/11/2025",
    "Año": 2025,
    "Dia": 307,
    "Temp Media (ºC)": "19,47",
    "Temp Max (ºC)": "24,66",
    "Hora Temp Max": "09:30",
    "Temp Mínima (ºC)": "15,41",
    "Hora Temp Min": "00:24",
    "Humedad Media (%)": "66,68",
    "Humedad Max (%)": "90,7",
    "Hora Hum Max": "00:00",
    "Humedad Min (%)": "40,75",
    "Hora Hum Mín": "09:30",
    "Velviento (m/s)": "1,29",
    "DirViento (º)": "18,26",
    "VelVientoMax (m/s)": "4,77",
    "Hora VelMax": "05:30",
    "Dir viento Vel Max (º)": "12,04",
    "Radiación (MJ/m2)": "14,59",
    "Precipitación (mm)": 0,
    "PePMon": 0,
    "EtPMon": "2,41"
    }
  ]; //A FUTURO ESTOS JSON LOS RECIBIMOS

  //--- Datos de la tabla a mostrar ---
  displayedColumns!: string[];
  dataSource!: any;
  rowNumber!: number;
  
  //--- Paginador ---
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //CONSTRUCTOR
  constructor() {

  }

  //MÉTODOS
  ngOnInit(): void {
    this.getTableData();
  }

  /**
   * TODO: ESTO ES PROVISIONAL
   * Ahora esta función coge el json de prueba y lo convierte en la tabla
   */
  getTableData() {
    this.dataSource = this.testData;
    this.displayedColumns = Object.keys(this.dataSource[0]); //Da por hecho que el json que nos dan tiene las mismas columnas en todos
    this.rowNumber = this.dataSource.length;
  }
}



  //CONSTRUCTOR

  //MÉTODOS
