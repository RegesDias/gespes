<?php
class ServidorModel {
      private $codfunc;
	private $nome;
      private $cpf;
	private $secretaria;
	private $secretarias;
      private $prefixo;
      private $prefixos;	
      private $cod_carg;	
      private $nome_carg;	
      private $dataadmis;	
      private $secao;
      private $secoes;
      private $contador;
      private $pagina;
      private $posicao;
      private $cpfs;
      
//CONSTRUTOR
  public function novoServidor($servidor){
    $this->setCodfunc($servidor->codfunc);
    $this->setNome($servidor->nome);
    $this->setCpf($servidor->cpf);
    $this->setSecretaria($servidor->secretaria);
    $this->setSecretarias($servidor->secretarias);
    $this->setPrefixo($servidor->prefixo);
    $this->setPrefixos($servidor->prefixos);
    $this->setNome_carg($servidor->nome_carg);
    $this->setDataadmis($servidor->dataadmis);
    $this->setSecao($servidor->secao);
    $this->setSecoes($servidor->secoes);
    $this->setContador($servidor->contador);
    $this->setPagina($servidor->pagina);
    $this->setPosicao($servidor->posicao);
    $this->setCpf($servidor->cpfs);
  }
  public function listarServidor($servidor){
      $this->setCodfunc($servidor->codfunc);
      $this->setNome($servidor->nome);
      $this->setSecao($servidor->secao);
      $this->setCpf($servidor->cpf);
    }
  //GET SET

  /**
   * Get the value of codfunc
   */ 
  public function getCodfunc()
  {
        return $this->codfunc;
  }
  public function setCodfunc($codfunc)
  {
        $this->codfunc = $codfunc;

        return $this;
  }

  /**
   * Get the value of nome
   */ 
  public function getNome()
  {
      return $this->nome;
  }
  public function setNome($nome)
  {
      $this->nome = $nome;

      return $this;
  }

  /**
   * Get the value of cpf
   */ 
  public function getCpf()
  {
        return $this->cpf;
  }
  public function setCpf($cpf)
  {
        $this->cpf = $cpf;

        return $this;
  }

  /**
   * Get the value of secretaria
   */ 
  public function getSecretaria()
  {
      return $this->secretaria;
  }

  public function setSecretaria($secretaria)
  {
      $this->secretaria = $secretaria;

      return $this;
  }

  /**
   * Get the value of secretarias
   */ 
  public function getSecretarias()
  {
      return $this->secretarias;
  }
  public function setSecretarias($secretarias)
  {
      $this->secretarias = $secretarias;

      return $this;
  }

    /**
     * Get the value of prefixo
     */ 
    public function getPrefixo()
    {
          return $this->prefixo;
    }
    public function setPrefixo($prefixo)
    {
          $this->prefixo = $prefixo;

          return $this;
    }

    /**
     * Get the value of prefixos
     */ 
    public function getPrefixos()
    {
          return $this->prefixos;
    }
    public function setPrefixos($prefixos)
    {
          $this->prefixos = $prefixos;

          return $this;
    }

    /**
     * Get the value of cod_carg
     */ 
    public function getCod_carg()
    {
          return $this->cod_carg;
    }
    public function setCod_carg($cod_carg)
    {
          $this->cod_carg = $cod_carg;

          return $this;
    }

    /**
     * Get the value of nome_carg
     */ 
    public function getNome_carg()
    {
          return $this->nome_carg;
    }

    public function setNome_carg($nome_carg)
    {
          $this->nome_carg = $nome_carg;

          return $this;
    }

    /**
     * Get the value of dataadmis
     */ 
    public function getDataadmis()
    {
          return $this->dataadmis;
    }
    public function setDataadmis($dataadmis)
    {
          $this->dataadmis = $dataadmis;

          return $this;
    }

    /**
     * Get the value of secao
     */ 
    public function getSecao()
    {
          return $this->secao;
    }
    public function setSecao($secao)
    {
          $this->secao = $secao;

          return $this;
    }

    /**
     * Get the value of secoes
     */ 
    public function getSecoes()
    {
          return $this->secoes;
    }
    public function setSecoes($secoes)
    {
          $this->secoes = $secoes;

          return $this;
    }

  /**
   * Get the value of contador
   */ 
  public function getContador()
  {
      return $this->contador;
  }
  public function setContador($contador)
  {
      $this->contador = $contador;

      return $this;
  }

  /**
   * Get the value of pagina
   */ 
  public function getPagina()
  {
      return $this->pagina;
  }
  public function setPagina($pagina)
  {
      $this->pagina = $pagina;

      return $this;
  }

  /**
   * Get the value of posicao
   */ 
  public function getPosicao()
  {
      return $this->posicao;
  }
  public function setPosicao($posicao)
  {
      $this->posicao = $posicao;

      return $this;
  }
  /**
   * Get the value of cpfs
   */ 
  public function getCpfs(){
      return $this->cpfs;
  }
  public function setCpfs($cpfs){
      $this->cpfs = $cpfs;

      return $this;
  }
}
?>