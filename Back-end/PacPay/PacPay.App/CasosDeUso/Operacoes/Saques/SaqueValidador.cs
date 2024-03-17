﻿using FluentValidation;

namespace PacPay.App.CasosDeUso.Operacoes.Saques
{
    public sealed class SaqueValidador : AbstractValidator<SaqueRequest>
    {
        public SaqueValidador()
        {
            RuleFor(x => x.Valor).NotEmpty().GreaterThan(0).WithMessage("O valor do saque deve ser maior que zero.");
        }
    }
}