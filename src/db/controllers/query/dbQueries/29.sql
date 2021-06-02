with reparacion_por_fecha as (
    select
      *
    from
      orden_reparacion
      join revision on revision.orden_reparacion_id = orden_reparacion.id
      and fecha_inicio between cast('{{fecha_inicio}}' as date)
      and cast('{{fecha_final}}' as date)
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
  limit 1;