with registrados_rango as (
    select
      *
    from
      automovil
    where
      fecha_registro between cast('{{fecha_inicio}}' as date)
      and cast('{{fecha_final}}' as date)
  )
select
  *
from
  registrados_rango
  join tipo_automovil on id = tipo_automovil_id;