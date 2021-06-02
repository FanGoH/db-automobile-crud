with ticket_en_fechas as
(select * from revision join (select id,fecha_inicio from ticket) as dbs(ids,fecha_inicio) on ticket_id = ids  where fecha_inicio between
					cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date)),
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
select ticket_id, sum(subtotal) from CostoTotal natural join revision  group by ticket_id union (select ("Total") as ticket_id, sum(subtotal) from CostoTotal) order by ticket_id asc;