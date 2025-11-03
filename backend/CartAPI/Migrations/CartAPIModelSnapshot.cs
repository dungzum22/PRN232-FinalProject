using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CartAPI.Migrations
{
    [DbContext(typeof(CartDbContext))]
    partial class CartAPIModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("CartAPI.Models.Cart", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("UserId")
                    .IsUnique();

                b.ToTable("Carts");
            });

            modelBuilder.Entity("CartAPI.Models.CartItem", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<int>("CartId")
                    .HasColumnType("integer");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<decimal>("Price")
                    .HasPrecision(10, 2)
                    .HasColumnType("numeric(10,2)");

                b.Property<int>("ProductId")
                    .HasColumnType("integer");

                b.Property<string>("ProductName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("Quantity")
                    .HasColumnType("integer");

                b.HasKey("Id");

                b.HasIndex("CartId");

                b.HasIndex("ProductId");

                b.ToTable("CartItems");
            });

            modelBuilder.Entity("CartAPI.Models.CartItem", b =>
            {
                b.HasOne("CartAPI.Models.Cart", "Cart")
                    .WithMany("Items")
                    .HasForeignKey("CartId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Cart");
            });

            modelBuilder.Entity("CartAPI.Models.Cart", b =>
            {
                b.Navigation("Items");
            });
#pragma warning restore 612, 618
        }
    }
}
