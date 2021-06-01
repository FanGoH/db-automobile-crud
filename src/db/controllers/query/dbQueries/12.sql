select
  *
from
  promocion
where
  final >= cast('{{fecha_inicio}}' as date)
  and inicio <= cast('{{fecha_final}}' as date);