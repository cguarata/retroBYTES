DROP DATABASE IF EXISTS RetroBytes;
CREATE DATABASE IF NOT EXISTS RetroBytes;
USE RetroBytes;

CREATE TABLE IF NOT EXISTS resenas (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	idUsuario int NOT NULL,
	idProducto int NOT NULL,
    idValorador int NOT NULL,
	contenido varchar(1000) NOT NULL,
	valoracion int NOT NULL,
	createdAt DATETIME NOT NULL,
	updatedAt DATETIME NULL,
    deletedAt DATETIME NULL,
	FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`idValorador`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS compraVenta (
	idUsuario INT NOT NULL,
    idProducto INT NOT NULL UNIQUE,
    fecha DATETIME NULL,
    FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS chats (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	idUsuario INT NOT NULL,
    idProducto INT NOT NULL,
    deletedAt DATETIME NULL,
    FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
	idChat INT NOT NULL,
    idUsuario INT NOT NULL,
    contenido varchar(500) NOT NULL,
	fecha DATETIME NOT NULL,
    FOREIGN KEY (`idChat`) REFERENCES `chats` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
);
