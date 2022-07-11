namespace ASP.NET_WebAPI6.Models;

public class ExceptionResponse
{
    public string message { get; set; }
    public string statusCode { get; set; }

    public ExceptionResponse(string message, string statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
