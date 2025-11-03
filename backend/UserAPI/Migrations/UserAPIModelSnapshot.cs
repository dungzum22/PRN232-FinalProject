using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace UserAPI.Migrations
{
    [DbContext(typeof(UserDbContext))]
    partial class UserAPIModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("UserAPI.Models.User", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Address")
                    .HasMaxLength(500)
                    .HasColumnType("character varying(500)");

                b.Property<string>("City")
                    .HasMaxLength(100)
                    .HasColumnType("character varying(100)");

                b.Property<string>("Country")
                    .HasMaxLength(100)
                    .HasColumnType("character varying(100)");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<DateTime>("DateOfBirth")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("Email")
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnType("character varying(255)");

                b.Property<string>("FullName")
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnType("character varying(255)");

                b.Property<bool>("IsActive")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("boolean")
                    .HasDefaultValue(true);

                b.Property<DateTime?>("LastLoginAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("PhoneNumber")
                    .HasMaxLength(20)
                    .HasColumnType("character varying(20)");

                b.Property<string>("Role")
                    .IsRequired()
                    .ValueGeneratedOnAdd()
                    .HasColumnType("text")
                    .HasDefaultValue("customer");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("CreatedAt");

                b.HasIndex("Email")
                    .IsUnique();

                b.HasIndex("IsActive");

                b.ToTable("Users");
            });
#pragma warning restore 612, 618
        }
    }
}
