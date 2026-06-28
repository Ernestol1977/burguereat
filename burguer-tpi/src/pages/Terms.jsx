import "../customs/theme.css";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router";

const Terms = () => {
  return (
    <div className="container mt-4">
      <h1>Términos y Condiciones</h1>
      <Container className="mt-5 mb-5 themed-order-card themed-order-card-terms">
        <p>
          Al registrarte, navegar o realizar un pedido en BurgerEat, aceptás los
          siguientes términos y condiciones.
        </p>

        <h4 className="mt-4">1. Uso de la plataforma</h4>
        <p>
          BurgerEat es una plataforma web para visualizar productos, realizar
          pedidos y consultar el estado de compra de una hamburguesería.
        </p>

        <h4 className="mt-4">2. Registro de usuario</h4>
        <p>
          Para acceder a determinadas funciones, el usuario debe registrarse con
          datos reales, completos y actualizados. Cada usuario es responsable
          por la información que ingresa en el sitio.
        </p>

        <h4 className="mt-4">3. Mayoría de edad</h4>
        <p>
          El usuario declara ser mayor de 18 años al registrarse y utilizar la
          plataforma. BurgerEat prioriza que el pedido sea recibido por una
          persona adulta. La empresa no se responsabiliza si el pedido es
          recibido por un menor en el domicilio indicado.
        </p>

        <h4 className="mt-4">4. Confirmación del pedido</h4>
        <p>
          Todo pedido queda sujeto a aceptación y disponibilidad. BurgerEat
          podrá rechazar o cancelar pedidos por falta de stock, errores en los
          datos, problemas operativos o situaciones excepcionales.
        </p>

        <h4 className="mt-4">5. Cambios y cancelaciones</h4>
        <p>
          Los pedidos podrán modificarse o cancelarse solo antes de entrar en
          estado <strong>“en preparación”</strong>. Una vez que el pedido
          comenzó a prepararse, no podrá modificarse ni anularse.
        </p>

        <h4 className="mt-4">6. Seguimiento del pedido</h4>
        <p>
          El usuario podrá consultar desde la web el estado actualizado de su
          pedido luego de iniciar sesión en la plataforma.
        </p>

        <h4 className="mt-4">7. Demoras y tiempos de entrega</h4>
        <p>
          Los tiempos de entrega son estimados y pueden variar según la demanda,
          el horario, la zona de reparto, las condiciones climáticas y otros
          factores operativos. BurgerEat no garantiza tiempos exactos de
          entrega.
        </p>

        <h4 className="mt-4">8. Promociones y descuentos</h4>
        <p>
          Las promociones, descuentos y combos especiales no son acumulables
          entre sí, salvo aclaración expresa.
        </p>

        <h4 className="mt-4">9. Productos e imágenes</h4>
        <p>
          Los productos publicados están sujetos a disponibilidad. Las imágenes
          son ilustrativas y pueden presentar diferencias con el producto
          entregado.
        </p>

        <h4 className="mt-4">10. Dirección de entrega</h4>
        <p>
          El pedido será enviado a la dirección ingresada por el usuario.
          BurgerEat no se responsabiliza por inconvenientes derivados de
          direcciones erróneas, incompletas o imposibles de localizar.
        </p>

        <h4 className="mt-4">11. Uso responsable</h4>
        <p>
          El usuario se compromete a utilizar la plataforma de forma adecuada,
          sin realizar pedidos falsos, maniobras abusivas o acciones que afecten
          el funcionamiento del sistema.
        </p>

        <h4 className="mt-4">12. Disponibilidad del sitio</h4>
        <p>
          BurgerEat procurará mantener el sitio operativo, pero no garantiza
          disponibilidad continua ni ausencia de errores técnicos o
          interrupciones temporales.
        </p>

        <h4 className="mt-4">13. Datos personales</h4>
        <p>
          Los datos ingresados por el usuario podrán ser utilizados para
          gestionar pedidos, autenticación, contacto y mejora del servicio.
        </p>

        <h4 className="mt-4">14. Modificaciones</h4>
        <p>
          BurgerEat podrá actualizar estos términos y condiciones en cualquier
          momento. El uso contínuo del sitio implica la aceptación de dichos
          cambios.
        </p>

        <h4 className="mt-4">15. Aceptación</h4>
        <p>
          El registro, la navegación y la realización de pedidos en BurgerEat
          implican la aceptación de estos Términos y Condiciones.
        </p>

        <div className="mt-4 text-center">
          <Link to="/register">
            <Button className="w-50 mb-5 btn-ctm">Volver al registro</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Terms;
