﻿using Microsoft.EntityFrameworkCore;
using PacPay.Dominio.Entidades;

namespace PacPay.Infra.Contexto
{
    public class AppDbContexto(DbContextOptions<AppDbContexto> options) : DbContext(options)
    {
        public DbSet<Conta> Contas { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Operacao> Operacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Operacao>()
                .Property(x => x.TipoOperacao)
                .HasConversion<string>();
        }
    }
}