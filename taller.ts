export interface Automovil {
	numero_serie: number;
	fecha_registro: string; //date
	color: string;
	tipo_automovil_id: TipoAutomovil["id"];
	cliente_dni: Cliente["dni"];
}

export interface Cliente {
	dni: string;
	nombre: string;
	apellido1: string;
	apellido2: string;
	direccion: string;
	telefono: number;
	recurrente: boolean;
}

export interface Departamento {
	numero: number;
	gerente: Empleado["dni"];
	nombre: string;
}

export interface Diagnostico {
	id: number;
	descripcion: string;
	clave_tipo: TipoDiagnostico["clave"];
}

export interface Empleado {
	dni: number;
	nombre: string;
	apellido1: string;
	apellido2: string;
	nacimiento: string; //date
	contratacion: string; //date
	sueldo_base: number;
	supervisor: Empleado["dni"];
	dno: Departamento["numero"];
}

export interface Entrega {
	id: number;
	fecha: string; //date
	motivo: string;
	entregado: boolean;
}

export interface Garantia {
	clave: string;
	duracion: string; //datetime
	descripcion: string;
	precio: number;
}

export interface OrdenPieza {
	pedido_refaccion_id: RefaccionesNecesarias["id"];
	refacciones_id: Refaccion["id"];
	cantidad: number;
}

export interface OrdenReparacion {
	id: number;
	fecha_inicio: string; //date
	fecha_finalizacion: string; //date
	id_entrega: Entrega["id"];
}

export interface PiezasTicket {
	ticket_id: Ticket["id"];
	refaccion_id: Refaccion["id"];
	cantidad: number;
	precio: number;
}

export interface Promocion {
	clave: string;
	porcentaje: number;
	cantidad: number;
	nombre: string;
	inicio: string; //date
	final: string;
}

export interface Refaccion {
	id: number;
	precio_proveedor: number;
	precio_publico: number;
	proveedor: string;
	cantidad_inventario: number;
}

export interface RefaccionCompatible {
	id_refaccion: Refaccion["id"];
	tipo_automovil_id: TipoAutomovil["id"];
}

export interface RefaccionesNecesarias {
	id: number;
	completada: boolean;
	creacion: string; //date
}

export interface Revision {
	diagnostico_id: Diagnostico["id"];
	empleado_dni: Empleado["dni"];
	cliente_dni: Cliente["dni"];
	ticket_id: Ticket["id"];
	automovil_numero_serie: Automovil["numero_serie"];
	automovil_cliente_dni: Automovil["cliente_dni"];
	orden_reparacion_id: OrdenReparacion["id"];
}

export interface ServicioRequerido {
	id: number;
	clave_tipo: TipoServicio["clave"];
	clave_garantia: Garantia["clave"];
	clave_promocion: Promocion["clave"];
	diagnostico_id: Diagnostico["id"];
	refacciones_necesarias_id: RefaccionesNecesarias["id"];
}

export interface Tarea {
	encargado: Empleado["dni"];
	dno: Departamento["numero"];
	completada: boolean;
	orden_reparacion_id: OrdenReparacion["id"];
	servicio_requerido_id: ServicioRequerido["id"];
}

export interface Ticket {
	fecha_inicio: string; //date
	fecha_fin: string; //date
	id: number;
}

export interface TipoAutomovil {
	id: number;
	marca: string;
	modelo: string;
	anyo: string; //datetime
}

export interface TipoDiagnostico {
	clave: string;
	precio: number;
	nombre: string;
}

export interface TipoServicio {
	clave: string;
	descripcion: string;
	costo: number;
}

export type Tablas = {
	automovil: Automovil;
	cliente: Cliente;
	departamento: Departamento;
	diagnostico: Diagnostico;
	empleado: Empleado;
	entrega: Entrega;
	garantia: Garantia;
	orden_pieza: OrdenPieza;
	orden_reparacion: OrdenReparacion;
	piezas_ticket: PiezasTicket;
	promocion: Promocion;
	refaccion: Refaccion;
	refaccion_compatible: RefaccionCompatible;
	refacciones_necesarias: RefaccionesNecesarias;
	revision: Revision;
	servicio_requerido: ServicioRequerido;
	tarea: Tarea;
	ticket: Ticket;
	tipo_automovil: TipoAutomovil;
	tipo_diagnostico: TipoDiagnostico;
	tipo_servicio: TipoServicio;
};

export const TableNames: (keyof Tablas)[] = [
	"automovil",
	"cliente",
	"departamento",
	"diagnostico",
	"empleado",
	"entrega",
	"garantia",
	"orden_pieza",
	"orden_reparacion",
	"piezas_ticket",
	"promocion",
	"refaccion",
	"refaccion_compatible",
	"refacciones_necesarias",
	"revision",
	"servicio_requerido",
	"tarea",
	"ticket",
	"tipo_automovil",
	"tipo_diagnostico",
	"tipo_servicio",
];
