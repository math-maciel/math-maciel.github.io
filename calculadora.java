@RESTController
@RequestMapping


public class calculadora{
    public String sub(){
        Integer n1 = 1;
        Integer n2 = 3;
        Integer res = n2-n1;
        return(res);
    }
    public String div(){
        Integer n1 = 1;
        Integer n2 = 3;
        Integer res = n2/n1;
        return(res);
    }
    public String add(){
        Integer n1 = 1;
        Integer n2 = 3;
        Integer res = n2+n1;
        return(res);
    }
    public String mul(){
        Integer n1 = 1;
        Integer n2 = 3;
        Integer res = n2*n1;
        return(res);
    }
}
