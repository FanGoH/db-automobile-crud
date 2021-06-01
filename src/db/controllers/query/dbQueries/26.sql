with revisiones_rango as (
    select
      diagnostico_id
    from
      ticket
      join revision on ticket_id = id
    where
      fecha_inicio between cast('{{fecha_inicio}}' as date)
      and cast('{{fecha_final}}' as date)
  ),
  servicios_rango as (
    select
      clave_promocion,
      count(*)
    from
      servicio_requerido
    where
      diagnostico_id in (
        select
          *
        from
          revisiones_rango
        where
          clave_promocion is not null
      )
    group by
      clave_promocion
  )
select
  *
from
  servicios_rango;