<?php
// Desactivar la visualización de errores para que no rompan el formato JSON
error_reporting(0);
ini_set('display_errors', 0);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluir el autoloader de Composer
require '../vendor/autoload.php';

// Configurar cabeceras para permitir peticiones desde el frontend (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Verificar que sea una petición POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del cuerpo de la petición (JSON)
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    // Validación básica
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Todos los campos obligatorios deben ser rellenados."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // --- CONFIGURACIÓN DEL SERVIDOR SMTP ---
        // Para pruebas usaremos Gmail.
        // IMPORTANTE: Necesitas generar una 'Contraseña de Aplicación' en tu cuenta de Google.
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@regladoconsultores.com'; 
        $mail->Password   = 'Reglado130891.*';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->CharSet    = 'UTF-8';

        // --- DESTINATARIOS ---
        $mail->setFrom('info@regladoconsultores.com', 'Web Reglado Consultores & Abogados');
        $mail->addAddress('info@regladoconsultores.com');     // Ahora recibirás las pruebas en tu Gmail
        $mail->addReplyTo($data['email'], $data['name']);

        // --- CONTENIDO DEL MENSAJE ESTILIZADO ---
        $mail->isHTML(true);
        $mail->Subject = 'Nuevo Contacto Web: ' . ($data['subject'] ?? 'General');
        
        // Colores y Estilos
        $primaryColor = '#0b3d91'; // Azul corporativo
        $bgColor = '#f4f7f6';
        $textColor = '#333333';
        
        $bodyContent = "
        <div style='background-color: {$bgColor}; padding: 40px 10px; font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif; color: {$textColor};'>
            <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);'>
                
                <!-- Header -->
                <div style='background-color: {$primaryColor}; padding: 30px; text-align: center; color: #ffffff;'>
                    <h1 style='margin: 0; font-size: 24px; letter-spacing: 1px;'>Reglado Consultores & Abogados</h1>
                    <p style='margin: 10px 0 0 0; opacity: 0.8;'>Notificación de Nuevo Mensaje</p>
                </div>
                
                <!-- Content -->
                <div style='padding: 30px;'>
                    <p style='font-size: 16px; line-height: 1.6;'>Has recibido un nuevo mensaje a través del formulario de contacto de la web.</p>
                    
                    <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
                        <tr>
                            <td style='padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: bold; width: 30%;'>Nombre:</td>
                            <td style='padding: 10px 0; border-bottom: 1px solid #eeeeee;'>" . htmlspecialchars($data['name']) . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: bold;'>Email:</td>
                            <td style='padding: 10px 0; border-bottom: 1px solid #eeeeee;'><a href='mailto:" . htmlspecialchars($data['email']) . "' style='color: {$primaryColor}; text-decoration: none;'>" . htmlspecialchars($data['email']) . "</a></td>
                        </tr>
                        <tr>
                            <td style='padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: bold;'>Teléfono:</td>
                            <td style='padding: 10px 0; border-bottom: 1px solid #eeeeee;'>" . htmlspecialchars($data['phone'] ?? 'No proporcionado') . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: bold;'>Asunto:</td>
                            <td style='padding: 10px 0; border-bottom: 1px solid #eeeeee;'>" . htmlspecialchars($data['subject'] ?? 'General') . "</td>
                        </tr>
                    </table>
                    
                    <div style='margin-top: 30px;'>
                        <p style='font-weight: bold; margin-bottom: 10px; color: {$primaryColor};'>Mensaje:</p>
                        <div style='background-color: #f9f9f9; padding: 20px; border-left: 4px solid {$primaryColor}; font-style: italic; line-height: 1.6;'>
                            " . nl2br(htmlspecialchars($data['message'])) . "
                        </div>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style='background-color: #333333; padding: 20px; text-align: center; color: #999999; font-size: 12px;'>
                    <p style='margin: 0;'>Este es un correo automático generado por el sitio web de Reglado.</p>
                    <p style='margin: 5px 0 0 0;'>&copy; " . date('Y') . " Reglado Consultores & Abogados. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
        ";
        
        $mail->Body = $bodyContent;

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Mensaje enviado con éxito."]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Hubo un problema al enviar el correo: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
