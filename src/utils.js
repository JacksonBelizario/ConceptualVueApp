export const tratarErros = (_this, request) => {
  if (request.status == 400) {
    const erros = request.listaDeErros.map(({ campoDoErro, mensagem }) => {
      //_this.$refs.formCustom.validateField(campoDoErro);
      return `<b>${campoDoErro}:</b> ${mensagem}`;
    });
    _this.$Modal.error({
      title: request.mensagem,
      content: erros.join("<br>")
    });
  } else if (request.status == 500) {
    _this.$Modal.error({
      title: "Erro!",
      content: request.mensagem
    });
  } else {
    console.warn(request);
    _this.$Modal.error({
      title: "Erro:",
      content: JSON.stringify(request)
    });
  }
};

export const isCPF = strCPF => {
  let Soma;
  let Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
};

export const validadorRegex = (rule, value, callback) => {
  const regex = new RegExp(rule.regex);
  console.log(rule);
  if (!value.match(regex)) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};

export const validadorCPF = (rule, value, callback) => {
  const regex = "([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})";
  const regexExp = new RegExp(regex);

  if (!value.match(regexExp) || !isCPF(value.match(/\d+/gi).join(""))) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};

/**
 * TODO
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validadorCNPJ = (rule, value, callback) => {
  const regex = "([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})";
  const regexExp = new RegExp(regex);
  //TODO
  /*if (!value.match(regexExp) && !isCPF(value.match(/\d+/gi).join(""))) {
      callback(new Error(rule.message));
    } else {
      callback();
    }*/
};
