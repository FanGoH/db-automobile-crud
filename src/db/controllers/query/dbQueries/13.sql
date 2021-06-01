with garantia_clave as (
    select
      clave
    from
      tipo_diagnostico
    where
      nombre = 'Reparacion Garantía'
  ),
  diagnosticos_garantia as (
    select
      *
    from
      diagnostico
    where
      clave_tipo in (
        select
          *
        from
          garantia_clave
      )
  ),
  garantias_fechas as (
    select
      diagnostico_id
    from
      orden_reparacion
      join tarea on tarea.orden_reparacion_id = orden_reparacion.id
      join servicio_requerido on tarea.servicio_requerido_id = servicio_requerido.id
      join diagnosticos_garantia on servicio_requerido.diagnostico_id = diagnosticos_garantia.id
    where
      fecha_finalizacoin between cast('{{fecha_inicio}}' as date)
      and cast('{{fecha_final}}' as date)
  ),
  costos as (
    select
      get_subtotal(diagnostico_id) as costo
    from
      garantias_fechas
  )
select
  *
from
  diagnosticos_garantia;