import AppDataSource from "../data-source"
import PetDoor from "../entities/PetDoor.entity"

export const ensureEspRegister = async (mac: string) => {

    const repo = AppDataSource.getRepository(PetDoor);

    const door = await repo.findOneBy({ mac });
    if(door) return;

    const newDoor = repo.create({ mac });
    await repo.save(newDoor);
}