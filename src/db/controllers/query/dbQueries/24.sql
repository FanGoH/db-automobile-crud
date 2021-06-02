with diagnostico_garantia as (
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
select * from cosas join departamento on numero=dno where cantidad >= all (select * from max_cosas);