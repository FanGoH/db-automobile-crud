select
  *
from
  promocion
where
  final between cast('{{fecha_inicio}}' as date)
  and cast('{{fecha_final}}' as date);