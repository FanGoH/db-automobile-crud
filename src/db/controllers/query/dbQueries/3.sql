with info_refacciones as
	(select * from refaccion),
compatibilidad as
	(select marca, modelo, anyo, id_refaccion 
		from refaccion_compatible join tipo_automovil 
        where tipo_automovil_id=id)
select * from refaccion left join compatibilidad on id=id_refaccion;