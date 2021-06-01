with servicios_requeridos as (
    select
      id
    from
      servicio_requerido
    where
      garantia
  ),
  trabajador_cantidad as (
    select
      encargado,
      count(*) as cantidad
    from
      tarea
    where
      servicio_requerido_id in (
        select
          *
        from
          servicios_requeridos
      )
    group by
      encargado
  ),
  max_cantidad as (
    select
      max(cantidad) as max_c
    from
      trabajador_cantidad
  )
select
  *
from
  empleado
  join trabajador_cantidad on encargado = dni;