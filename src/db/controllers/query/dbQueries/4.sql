with info_diagnosticos as
	(select precio , clave,tipo_diagnostico.nombre from diagnostico join tipo_diagnostico on clave_tipo=clave where diagnostico.id in (select revision.diagnostico_id from revision where revision.orden_reparacion_id is null))
select nombre,clave,count(nombre) as cantidad_diagnosticos, sum(precio) as ingresos from info_diagnosticos group by clave;