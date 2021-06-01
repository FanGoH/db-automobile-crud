with ordenes_rango as (
    select
      id
    from
      orden_reparacion
    where
      fecha_inicio between cast('{{fecha_inicio}}' as date)
      and cast('{{fecha_final}}' as date)
  ),
  tareas_rango as (
    select
      servicio_requerido_id
    from
      tarea
    where
      orden_reparacion_id in (
        select
          *
        from
          ordenes_rango
      )
  ),
  ganancias_servicios as (
    select
      clave,
      count(*) * costo as ganancias
    from
      servicio_requerido
      join tipo_servicio on clave_tipo = clave
    group by
      clave
  )
select
  *
from
  ganancias_servicios
order by
  ganancias asc;