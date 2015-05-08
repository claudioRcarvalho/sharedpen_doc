create database sharedpen;
use sharedpen;

SET FOREIGN_KEY_CHECKS=0;

create table utilizadores(
	id_utilizador int NOT NULL AUTO_INCREMENT,
    user nvarchar(10) NOT NULL,
    pass nvarchar(50) NOT NULL,
	nome nvarchar(20) NOT NULL, 
    contacto int(9)   NOT NULL,
    id_agrupamento int NULL,
    id_role int NOT NULL,
    primary key(id_utilizador),
    foreign key (id_role) references roles(id_role)
)ENGINE=InnoDB;


create table roles(
	id_role int NOT NULL auto_increment,
    nome nvarchar(15) NOT NULL,
    primary key (id_role)
)ENGINE=InnoDB;


create table agrupamento(
	id_agrupamento int NOT NULL auto_increment,
    nome nvarchar(20) NOT NULL,
    contacto int(9) NOT NULL,
    id_responsavel int NOT NULL,
	primary key (id_agrupamento)
)ENGINE=InnoDB;


create table projectos(
	id_projecto int NOT NULL auto_increment,
    nome nvarchar(20) NOT NULL,
    id_criador int NOT NULL,
    tipo_projecto int NOT NULL,
    id_grupo int NOT NULL,
    primary key (id_projecto),
    foreign key (id_criador) references utilizadores(id_utilizador),
    foreign key (tipo_projecto) references tipo_projecto(id_tipo),
    foreign key (id_grupo) references grupo(id_grupo)
)ENGINE=InnoDB;


create table tipo_projecto(
	id_tipo int NOT NULL auto_increment,
    nome nvarchar(20) NOT NULL,
    primary key (id_tipo)
) ENGINE=InnoDB;


create table escola(
		id_escola int NOT NULL auto_increment,
        id_agrupamento int NOT NULL,
        nome nvarchar(20) NOT NULL,
        contacto int (9) NOT NULL,
        morada nvarchar(50) NOT NULL,
        primary key (id_escola),
        foreign key (id_agrupamento) references agrupamento (id_agrupamento)
)ENGINE=InnoDB;


create table grupos(
		id_grupo int NOT NULL auto_increment,
        id_projecto int NOT NULL,
        primary key (id_grupo),
        foreign key (id_projecto) references projecto(id_projecto)
)ENGINE=InnoDB;

create table projecto_grupo(
	id_projecto int NOT NULL,
    id_grupo int NOT NULL,
    id_utilizador int NOT NULL,
    foreign key(id_projecto) references projecto(id_projecto),
    foreign key(id_grupo) references grupo(id_grupo),
    foreign key (id_utilizador) references utilizadores(id_utilizador)
)ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS=1;

