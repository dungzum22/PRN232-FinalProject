using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FeedbackAPI.Migrations
{
    [DbContext(typeof(FeedbackDbContext))]
    partial class FeedbackAPIModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("FeedbackAPI.Models.Feedback", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Comment")
                    .IsRequired()
                    .HasMaxLength(2000)
                    .HasColumnType("character varying(2000)");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<int>("HelpfulCount")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasDefaultValue(0);

                b.Property<bool>("IsVerifiedPurchase")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("boolean")
                    .HasDefaultValue(false);

                b.Property<int>("ProductId")
                    .HasColumnType("integer");

                b.Property<string>("ProductName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("Rating")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasDefaultValue(0);

                b.Property<DateTime?>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.Property<string>("UserName")
                    .IsRequired()
                    .HasColumnType("text");

                b.HasKey("Id");

                b.HasIndex("CreatedAt");

                b.HasIndex("ProductId");

                b.HasIndex("Rating");

                b.HasIndex("UserId");

                b.ToTable("Feedbacks");
            });
#pragma warning restore 612, 618
        }
    }
}
