export const queries = [
	{
		description:
			"# 1 Mostrar la informacion del cliente con mayor frecuencia en reparaciones que se le hayan atendido en un periodo de tiempo",
		query: `with cliente_reparaciones as 
	(select * from
		(select cliente_dni, count(*)  as v
			from orden_reparacion join revision on id=orden_reparacion_id 
			where fecha_inicio 
				between cast('1900-01-01' as date) 
					and cast('2050-01-01' as date)
			group by cliente_dni) 
	as coso),
max_reparaciones as 
	(select max(v) as m from cliente_reparaciones),
clientes_max_reparaciones as
	(select cliente_dni, v as cantidad  from cliente_reparaciones where v=(select m from max_reparaciones))
select * from clientes_max_reparaciones;`,
	},

	{
		description:
			"# 2 Mostrar la informacion de las promociones aplicadas en el departamento mecanico en un periodo de fechas especifico.",
		query: `with servicios_entre as
	(select servicio_requerido_id 
		from tarea join orden_reparacion on id=orden_reparacion_id 
        where fecha_inicio 
			between cast('1900-01-01' as date) 
				and cast('2050-01-01' as date)),
promociones_usadas as
	(select distinct clave_promocion, dno 
		from servicio_requerido join tarea on id=servicio_requerido_id 
        where id in (select * from servicios_entre) 
            and clave_promocion is not null),
dno_mecanico as
	(select numero from departamento where nombre='mecanico'),
promociones_mecanico as
	(select distinct clave_promocion 
		from promociones_usadas 
        where dno in (select * from dno_mecanico))
select * from promocion 
	where clave in (select * from promociones_mecanico);`,
	},
	{
		description:
			"# 3 Mostrar la informacion del inventario de refacciones que tiene cada producto registrado.",
		query: `with info_refacciones as
	(select * from refaccion),
compatibilidad as
	(select marca, modelo, anyo, id_refaccion 
		from refaccion_compatible join tipo_automovil 
        where tipo_automovil_id=id)
select * from refaccion left join compatibilidad on id=id_refaccion;`,
	},
	{
		description:
			"# 4 Mostrar las ventas obtenidas con respecto al serivicio de solo diagnosticos.",
		query: `with info_diagnosticos as
	(select precio from diagnostico join tipo_diagnostico on clave_tipo=clave join revision on id = revision.diagnostico_id where orden_reparacion_id is null )
select count(precio) as cantidad_diagnosticos, sum(precio) as ingresos from info_diagnosticos;`,
	},
	{
		description:
			"# 5 Mostrar entre  el periodo de rango de fechas el numero de atenciones para cada departamento del taller.",
		query: `with atenciones_periodo as
	(select dno, fecha_finalizacoin 
		from tarea join orden_reparacion on servicio_requerido_id=id 
        where fecha_finalizacoin 
			between cast('2020-01-01' as date) 
				and cast('2050-01-01' as date))
select nombre, dno, count(fecha_finalizacoin) as cantidad 
	from atenciones_periodo join departamento on numero=dno 
    group by dno;`,
	},
	{
		description:
			"# 6 Mostrar las ganacias obtenidas en un rango de fechas especifico en base a un despartamento en particular.",
		query: `with departamento_dno as
	(select numero from departamento 
		where nombre='electrico'),
tareas_periodo as
	(select servicio_requerido_id, dno 
		from tarea join orden_reparacion on id=servicio_requerido_id 
		where fecha_finalizacoin 
			between cast('1900-01-01' as date) 
				and cast('2050-01-01' as date)),
tareas_departamento as
	(select dno, servicio_requerido_id from tareas_periodo where dno in (select * from departamento_dno)),
costo_servicios as
	(select id, costo from servicio_requerido join tipo_servicio on clave_tipo=clave),
ingresos_tareas as 
	(select dno, costo from tareas_departamento join costo_servicios on id=servicio_requerido_id),
ingresos_piezas as
	(select 4 as dno,sum(cantidad * precio) as ingresos from (select ticket.id from ticket where fecha_inicio between cast('1900-01-01' as date) and cast('2050-01-01' as date)) as dd join piezas_ticket on id =ticket_id)
select *  from ((select dno, sum(costo) as ingresos from ingresos_tareas group by dno) union (select dno,ingresos from ingresos_piezas))as dd join departamento on numero
limit 1;`,
	},
	{
		description:
			"# 7 Mostrar el empleado que mayor ganancia obtuvo en un rango de fechas especifico.",
		query: `with tareas_empleados as
	(select encargado, servicio_requerido_id 
		from tarea join orden_reparacion on servicio_requerido_id=id
		where fecha_finalizacoin 
			between cast('2020-01-01' as date) 
				and cast('2050-01-01' as date)),
servicios_realizados as
	(select encargado, clave_tipo 
		from tareas_empleados join servicio_requerido on id=servicio_requerido_id),
ingresos_empleados as
	(select ANY_VALUE(encargado) as encargado, sum(costo) as ganancias 
		from servicios_realizados join tipo_servicio on clave_tipo=clave 
        group by encargado),
empleado_ganancias as
	(select ANY_VALUE(encargado) as encargado, ANY_VALUE(ganancias) as ganancias 
		from ingresos_empleados),
max_ganancias as
	(select max(ganancias) as m from empleado_ganancias)
select * from empleado join empleado_ganancias on encargado=dni and ganancias=(select m from max_ganancias);`,
	},
	{
		description:
			"# 8 Mostrar e listado de supervisores y sus supervisados en base a un departamento especifico.",
		query: `with num_dep as 
	(select numero from departamento where nombre='Electrico'),
supervisores as
	(select supervisor as super_dni, nombre as super_nombre from empleado where dno in (select * from num_dep))
select super_dni, super_Nombre, dni, nombre as supervisado from empleado join supervisores on supervisor=super_dni order by super_dni asc;
`,
	},
	{
		description:
			"# 9 Mostrar el listado de clientes registrados junto con los automoviles que tiene registrados en sistema.",
		query: `select * from cliente join automovil on cliente_dni=dni join tipo_automovil on id=tipo_automovil_id order by dni;
`,
	},
	{
		description:
			"# 10 Mostrar las reparaciones mas concurrentes en base a un departamento especifico.",
		query: `with num_dep as 
	(select numero from departamento where nombre='electrico'),
tarea_departamento as
	(select tarea where dno in (select * from num_dep)),
requeridos_departamento as
	(select dno, clave_tipo 
		from tarea join servicio_requerido on id=servicio_requerido_id)
select nombre, clave_tipo, count(*) as cantidad 
	from requeridos_departamento join departamento on numero=dno
    where dno=(select numero from num_dep)
    group by dno, clave_tipo 
    order by cantidad desc;`,
	},
	{
		description:
			"# 11 Mostrar el departamento que presenta el mayor consumo de refacciones en un periodo de fecha determinado y muestr el numero de refacciones utilizadas.",
		query: `with ordenes_piezas_cantidad as
	(select pedido_refaccion_id, sum(cantidad) as total 
		from orden_piezas 
        group by pedido_refaccion_id),
tareas_periodo as
	(select servicio_requerido_id as sr_id, dno 
		from tarea join orden_reparacion on id=servicio_requerido_id 
        where fecha_finalizacoin 
			between cast('1900-01-01' as date) 
				and cast('2050-01-01' as date)),
ordenes_departamento as
	(select ANY_VALUE(dno) as dno, sum(total) as numero_total 
		from servicio_requerido join tareas_periodo on sr_id=id join ordenes_piezas_cantidad on refacciones_necesarias_id=pedido_refaccion_id 
        group by dno),
max_dep as
	(select ANY_VALUE(dno) as dno, ANY_VALUE(numero_total) as numero_ordenadas from ordenes_departamento having max(numero_total))
select * from departamento join max_dep on dno=numero;`,
	},
	{
		description:
			"# 12 Mostrar las promociones vigentes por un rango de fechas determinado.",
		query: `select * from promocion where final >= cast('1900-01-01' as date) and inicio <= cast('2050-01-01' as date);
`,
	},
	{
		description:
			"# 13 Mostrar las garantias que se han presentado en los servicios y que costo ha generado por un rango de fechas especifico.",
		query: `with garantia_clave as (
	select clave from tipo_diagnostico where clave='6SEVB'
),
diagnosticos_garantia as (
	select * from diagnostico where clave_tipo in (select * from garantia_clave)
),
garantias_fechas as (
	select diagnostico_id from 
		orden_reparacion join revision on orden_reparacion.id=orden_reparacion_id join diagnosticos_garantia on diagnostico_id = diagnosticos_garantia.id
        where fecha_finalizacoin 
			between cast('1800-01-01' as date) 
				and cast('2050-01-01' as date)
),
costos as (
	select ticket_id,precio_ticket(ticket_id) as costo from garantias_fechas natural join revision 
)
select * from costos;`,
	},
	{
		description:
			"# 14 Mostrar el departameto con mayor afluencia de reparaciones en un rango de fechas determinado.",
		query: `with numero_reparaciones_dpto as (
	select dno, count(*) as cantidad
		from tarea join orden_reparacion on id=servicio_requerido_id 
		where fecha_finalizacoin 
			between cast('2010-01-01' as date) 
				and cast('2020-01-01' as date) group by dno),
max_rep as (
	select max(cantidad) from numero_reparaciones_dpto
)
select nombre, dno, cantidad from numero_reparaciones_dpto join departamento on dno=numero where cantidad in (select * from max_rep);`,
	},
	{
		description:
			"# 15 Mostrar el departameto con menor afluencia de reparaciones por un rango de fecha determinado.",
		query: ` with numero_reparaciones_dpto as (
	select dno, count(*) as cantidad
		from tarea join orden_reparacion on id=servicio_requerido_id 
		where fecha_finalizacoin 
			between cast('1900-01-01' as date) 
				and cast('2050-01-01' as date) group by dno),
max_rep as (
	select min(cantidad) from numero_reparaciones_dpto
)
select nombre, dno, cantidad from numero_reparaciones_dpto  join departamento on dno=numero where cantidad in (select * from max_rep);`,
	},
	{
		description:
			"# 16 Mostrar el consumo de refacciones clasificado por departamento.",
		query: `with orden_refacciones_dpto as (
	select dno, refacciones_necesarias_id from tarea join servicio_requerido on servicio_requerido_id=id
),
refacciones_ordenes as (
	select nombre, dno, cantidad from orden_refacciones_dpto join orden_piezas on pedido_refaccion_id=refacciones_necesarias_id  natural join (select numero,nombre from departamento) as dd(dno,nombre)
)
select nombre, dno, count(cantidad) as cantidad_refacciones from refacciones_ordenes group by dno order by cantidad_refacciones asc;`,
	},
	{
		description:
			"# 17 Mostrar las ganacias obtenidas del taller por un rango de fechas determinado.",
		query: `with ticket_en_fechas as
(select * from revision join (select id,fecha_inicio from ticket) as dbs(ids,fecha_inicio) on ticket_id = ids  where fecha_inicio between
					cast('2019-01-01' as date) 
				and cast('2020-01-01' as date)),
ticket_costos as 
(select ticket_id, (cantidad * precio) as subtotal from ticket_en_fechas natural join piezas_ticket),
reparaciones as
(select * from ticket_en_fechas natural join tarea  join (select * from servicio_requerido) as dbb(id,clave_tipo,clave_garantia,clave_promocion,diag, refac,gar)  on servicio_requerido_id = dbb.id left join promocion on clave_promocion = promocion.clave join (select * from tipo_servicio) as dbc(clv,descs,costo) on clave_tipo =dbc.clv),
reparaciones_porcentaje as
(select ticket_id,(costo - (costo * porcentaje)) as subtotal from reparaciones where porcentaje is not null and clave_promocion is not null),
reparaciones_descuento as
(select ticket_id,(costo - cantidad) as subtotal from reparaciones where cantidad is not null and clave_promocion is not null),
reparaciones_normales as 
(select ticket_id,costo as subtotal from reparaciones where clave_promocion is  null),
CostoTotal as
(select * from ((select * from ticket_costos) union (select * from reparaciones_descuento) union (select * from reparaciones_porcentaje) union (select * from reparaciones_normales)) as db)
select ticket_id, sum(subtotal) from CostoTotal natural join revision  group by ticket_id union (select ("Total") as ticket_id, sum(subtotal) from CostoTotal) order by ticket_id asc;`,
	},
	{
		description:
			"# 18 Mostrar el listado de empleados clasificado por departamentos.",
		query: `select * from empleado join departamento on numero=dno;`,
	},
	{
		description:
			"# 19 Mostrar el las caracteristicas de los automoviles registrado en un periodo de tiempo determinado.",
		query: `with registrados_rango as (
	select * from automovil 
		where fecha_registro 
			between cast('1900-01-01' as date) 
				and cast('2050-01-01' as date))
select * from registrados_rango join tipo_automovil on id=tipo_automovil_id;`,
	},
	{
		description:
			"# 20 Mostrar los clientes que solo realizaron servicios de diagnostico en un periodo de fecha determinado.",
		query: `with clientes_fecha as (
	select cliente_dni from ticket join revision on ticket_id=id
		where fecha_inicio
			between cast('1900-01-01' as date) 
				and cast('2050-01-01' as date)
			and orden_reparacion_id is null
)
select * from cliente where dni in (select * from clientes_fecha);`,
	},
	{
		description:
			"# 21 Mostrar el cliente con el mayor gasto en reparaciones realizado.",
		query: ` with gasto_clientes as (
	select cliente_dni, sum(precio_ticket(id)) as gasto from ticket join revision on id=ticket_id group by cliente_dni
),
max_gasto as (
	select max(gasto) from gasto_clientes
)
select * from cliente join gasto_clientes on cliente_dni=dni where gasto >= any (select * from max_gasto);`,
	},
	{
		description:
			"# 22 Mostrar el automovil con el mayor gasto realizado en un periodo de tiempo determinado.",
		query: `with gasto_automovil as (
	select automovil_numero_serie, sum(precio_ticket(id)) as gasto from ticket join revision on id=ticket_id
		where fecha_inicio
			between cast('1900-01-01' as date) 
				and cast('2050-01-01' as date) group by automovil_numero_serie
),
max_gasto as (
	select max(gasto) from gasto_automovil
)
select * from automovil join gasto_automovil on automovil_numero_serie=numero_serie where gasto >= any (select * from max_gasto);`,
	},
	{
		description:
			"# 23 Mostrar cual es la refaccion mas vendida del departamento de refacciones y cuanto genera de ganancia.",
		query: `with refacciones_vendidas as (
	select refacciones_id, sum(cantidad) as cantidad from orden_piezas group by refacciones_id
),
max_cantidad as (
	select max(cantidad) from refacciones_vendidas
)
select (precio_publico - precio_proveedor) as ganancias, cantidad, proveedor, cantidad_inventario, Nombre, precio_publico, precio_proveedor from refaccion join refacciones_vendidas on refacciones_id=id where cantidad >= any (select * from max_cantidad);`,
	},
	{
		description:
			"# 24 Mostrar el departamento con mayor numero de garantias aplicadas y cuanto suma de gasto debido a dichas garantias.",
		query: `with diagnostico_garantia as (
	select clave from tipo_diagnostico where clave='6SEVB'
),
garantias_aplicadas as (
	select servicio_requerido.id as id, ticket_id from servicio_requerido join diagnostico on diagnostico_id=diagnostico.id join (select ticket_id, diagnostico_id as diag from revision) as tb on diag = diagnostico.id
		where diagnostico.clave_tipo  in (select * from diagnostico_garantia)
),
cosas as (
select dno, count(*) as cantidad, sum(precio_ticket(ticket_id)) as subtotal from tarea join garantias_aplicadas on id=servicio_requerido_id group by dno
),
max_cosas as (
	select max(cantidad) from cosas
)
select * from cosas join departamento on numero=dno where cantidad >= all (select * from max_cosas);`,
	},
	{
		description:
			" # 25 Mostrar el cliente con mayor tiempo de no visitar el taller en base a un rango de fechas determiando.",
		query: `with tickets_rango as (
	select * from ticket where fecha_inicio 
        between cast('1900-01-01' as date) 
				and cast('2050-01-01' as date)
),
clientes_visitas as (
	select cliente_dni, max(fecha_inicio) as ultima_visita from tickets_rango, revision where ticket_id=id group by cliente_dni
),
ultima_visita_fecha as (
	select min(ultima_visita) as fecha from clientes_visitas join cliente on cliente_dni=dni
)
select * from clientes_visitas join cliente on dni=cliente_dni where ultima_visita <= (select * from ultima_visita_fecha);`,
	},
	{
		description:
			"# 26 Mostrar la promocion mas aplicada en un rango de fechas determinado.",
		query: `with revisiones_rango as (
	select diagnostico_id from ticket join revision on ticket_id=id 
		where fecha_inicio 
			between cast('1900-01-01' as date) 
					and cast('2050-01-01' as date)
),
servicios_rango as (
	select clave_promocion, count(*) as NumeroProm from servicio_requerido where diagnostico_id in (select * from revisiones_rango where clave_promocion is not null) group by clave_promocion
)
select * from servicios_rango join promocion  on clave_promocion = clave order by numeroProm desc;`,
	},
	{
		description:
			"# 27 Mostrar el numero de promociones vencidas en un rango de fechas determinado.",
		query: `with prom as
(select *,count(*) from promocion
	where final 
			between cast('2000-01-01' as date) 
					and cast('2021-01-01' as date) group by clave)
select * from prom union (select null,null,null,"Total",null,null, count(*) from prom);`,
	},
	{
		description:
			"# 28 Mostrar los datos del trabajador con mayor garantias aplicadas de los servicio que realizo.",
		query: `with servicios_requeridos as (
	select id from servicio_requerido where garantia
),
trabajador_cantidad as (
	select encargado, count(*) as cantidad from tarea where servicio_requerido_id in (select * from servicios_requeridos) group by encargado
),
max_cantidad as (
	select max(cantidad) as max_c from trabajador_cantidad
)
select * from empleado join trabajador_cantidad on encargado=dni;`,
	},
	{
		description:
			"# 29 Mostrar el nombre de cliente y el nombre del automovil que haya presentado el mayor numero de servicios aplicados en un periodo de fechas determinado.",
		query: ` with reparacion_por_fecha as (
    select
      *
    from
      orden_reparacion
      join revision on revision.orden_reparacion_id = orden_reparacion.id
      and fecha_inicio between cast('1900-01-01' as date)
      and cast('2050-01-01' as date)
  ),
  tareas_totales as (
    select
      automovil_cliente_dni,
      automovil_numero_serie,
      count(*) as NumServicio
    from
      reparacion_por_fecha
      natural join tarea  group by automovil_numero_serie, automovil_cliente_dni having count(*) = NumServicio
  )
select
  nombre, automovil_numero_serie, NumServicio
from
  tareas_totales join cliente on dni=automovil_cliente_dni order by NumServicio desc
  limit 1;`,
	},
	{
		description:
			"# 30 Mostrar los servicios con menores ganacias obtenidas en un periodo de fechas determinado.",
		query: ` with ordenes_rango as (
	select id from orden_reparacion where fecha_inicio 
		between cast('1900-01-01' as date) 
			and cast('2050-01-01' as date)
),
tareas_rango as (
	select servicio_requerido_id from tarea where orden_reparacion_id in (select * from ordenes_rango)
),
ganancias_servicios as (
	select clave, count(*) * costo as ganancias from servicio_requerido join tipo_servicio on clave_tipo=clave group by clave
)
select * from ganancias_servicios order by ganancias asc;`,
	},
];
