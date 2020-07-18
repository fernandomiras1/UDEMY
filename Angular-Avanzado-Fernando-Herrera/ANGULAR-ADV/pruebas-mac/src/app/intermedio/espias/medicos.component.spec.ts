import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { from, EMPTY, throwError } from 'rxjs';


describe('MedicosComponent', () => {

  let componente: MedicosComponent;
  // neceista la inyeccion de http. Le mandamos un null para que no tire error ya q no neceistamos que haga una llamada http
  const servicio = new MedicosService(null);

  beforeEach( () => {
    // inicializamos el componente.
    componente = new MedicosComponent(servicio);
  });


  it('Init: Debe de cargar los medicos', () => {


    /**
      ESPIAS: Podemos simular peticiones falsas (Http)

      Lo que le estoy diciendo es espia al servico y cuando alguien a getMedicos
      vas a llamar y vas a ejecutar esta funcion que te voy a definir

    */

    const medicos = ['medico1', 'medico2', 'medico3'];

    spyOn( servicio, 'getMedicos').and.callFake(() => {

      return from([ medicos ]);

    })


    componente.ngOnInit();
    // tiene que ser mayor a 0
    expect(componente.medicos.length).toBeGreaterThan(0);
  });

  it('Debe de llamar al servidor para agregar un médico', () => {

    const espia = spyOn(servicio, 'agregarMedico').and.callFake((medico) => {

      // esta regresando un Observable vacio.
      return EMPTY;

    });
    componente.agregarMedico( );

    // debemos esperar que el servicio agregar medico sea llamado.
    expect(espia).toHaveBeenCalled();

  });

  it('Debe de agregar un nuevo medico al arreglo de medicos',() => {
    const medico = {id: 1, nombre: 'Fer' }
    // cuando se llame agregar medico, va a devolver un medico
    spyOn(servicio, 'agregarMedico').and.returnValue(from([ medico ]));

    componente.agregarMedico();
    // verificamos que el medico que agregamos este en el array de medicos.
    expect( componente.medicos.indexOf(medico) ).toBeGreaterThanOrEqual(0);
  });


  it('Si falla la adicion, la propiedad mensajeError, debe ser igual al error del servicio', () => {

    const miError =  'No se pudo agregar el medico';

    spyOn(servicio, 'agregarMedico').and.returnValue( throwError(miError));

    componente.agregarMedico();

    // El mesanje deberia ser igual al mensaje que estoy lanzando.
    expect(componente.mensajeError).toBe(miError);

  });

  it('Debe de llamar al servidor para borrar un medico', () => {

    // simulamos que apretamos click en el alert. Para que no me muestre el prom
    spyOn(window, 'confirm').and.returnValue(true);

    const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);

    componente.borrarMedico('1'); // suponiendo que quiero brrar el medico con el id 1

    // Espera ser llamado con un argumento
    expect( espia ).toHaveBeenCalledWith('1');
  });

  it('No debe de llamar al servidor para borrar un medico', () => {

    // simulamos que apretamos click en el alert. Para que no me muestre el prom
    spyOn(window, 'confirm').and.returnValue(false);

    const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);

    componente.borrarMedico('1'); // suponiendo que quiero brrar el medico con el id 1

    // Espera ser llamado con un argumento
    expect( espia ).not.toHaveBeenCalledWith('1');
  });



});
