using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ProductAndCategoryAPI.Migrations
{
    [DbContext(typeof(ProductDbContext))]
    partial class ProductAPIModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ProductAndCategoryAPI.Models.Category", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("Description")
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnType("character varying(1000)");

                b.Property<string>("ImageUrl")
                    .HasColumnType("text");

                b.Property<bool>("IsActive")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("boolean")
                    .HasDefaultValue(true);

                b.Property<string>("Name")
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnType("character varying(255)");

                b.Property<DateTime?>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("IsActive");

                b.HasIndex("Name");

                b.ToTable("Categories");
            });

            modelBuilder.Entity("ProductAndCategoryAPI.Models.Product", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<int>("CategoryId")
                    .HasColumnType("integer");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("Description")
                    .IsRequired()
                    .HasMaxLength(2000)
                    .HasColumnType("character varying(2000)");

                b.Property<string>("ImageUrl")
                    .HasColumnType("text");

                b.Property<bool>("IsActive")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("boolean")
                    .HasDefaultValue(true);

                b.Property<string>("Name")
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnType("character varying(255)");

                b.Property<decimal>("Price")
                    .HasPrecision(10, 2)
                    .HasColumnType("numeric(10,2)");

                b.Property<int>("Quantity")
                    .HasColumnType("integer");

                b.Property<DateTime?>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("CategoryId");

                b.HasIndex("CreatedAt");

                b.HasIndex("IsActive");

                b.HasIndex("Name");

                b.ToTable("Products");
            });

            modelBuilder.Entity("ProductAndCategoryAPI.Models.Product", b =>
            {
                b.HasOne("ProductAndCategoryAPI.Models.Category", "Category")
                    .WithMany("Products")
                    .HasForeignKey("CategoryId")
                    .OnDelete(DeleteBehavior.Restrict)
                    .IsRequired();

                b.Navigation("Category");
            });

            modelBuilder.Entity("ProductAndCategoryAPI.Models.Category", b =>
            {
                b.Navigation("Products");
            });
#pragma warning restore 612, 618
        }
    }
}
