export interface Member {
	nombre: string;
	imagen: string;
	linkedin: string;
}

export interface Section {
	[key: string]: Member;
}

export interface SectionsFile {
	sections: {
		[key: string]: Section;
	};
}