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
      count(*) NumServicio
    from
      reparacion_por_fecha
      join tarea on tarea.orden_reparacion_id = id
    group by
      automovil_numero_serie
  )
select
  *
from
  tareas_totales;